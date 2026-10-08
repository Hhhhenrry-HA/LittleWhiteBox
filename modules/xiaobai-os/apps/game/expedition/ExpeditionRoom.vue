<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { useAppBack, useAppLayer } from '../../../shell/app-src/navigation/app-navigation.js';
import { createExpeditionClient } from './client.js';
import { createCampaignPlayback } from './presentation/playback.js';
import { createCampaign, CAMPAIGN_RULES, loadoutIssue } from './campaign/rules.js';
import { CAMPAIGN_COPY as c, FACT_COPY, campaignObjective } from './content/campaign-copy.js';
import { WORLD_COPY as w } from './content/world-copy.js';
import { COURTYARD } from './content/courtyard.js';
import type { CourtyardFact } from './content/world-types.js';
import { isPerson, participantName, type Participant } from './content/participants.js';
import { parleyInteractions } from './campaign/parley.js';
import { DIALOGUE_COPY as dialogueCopy } from './content/dialogue-copy.js';
import { availableChoices, CAMPAIGN_ACTIONS } from './content/campaign-actions.js';
import { COPY, ENEMY_NAMES, RELIC_COPY, WEAPON_COPY, skillDetail, errorText } from './copy.js';
import { RULES, WEAPON_LIST, isBoss } from './content.js';
import type { Command, Weapon } from './types.js';
import { createExpeditionSound } from './sound.js';
import ExplorationField from './presentation/ExplorationField.vue';
import CampaignMap from './presentation/CampaignMap.vue';
import ExpeditionIcon from './ExpeditionIcon.vue';
import ExpeditionWardrobe from './ExpeditionWardrobe.vue';
import ConversationMeters from './presentation/ConversationMeters.vue';
import { campaignInteractions } from './world/people.js';
import './presentation/campaign.css';

const props = defineProps<{ bridge: XiaobaiOsFrameBridge; chatIdentity: string; generationActive: boolean }>();
const client = createExpeditionClient(props.bridge, props.chatIdentity), playback = createCampaignPlayback(client);
const { view, notice, busy, blocked, talking, conversationFailure } = client, { current: run, dirty } = playback;
const weapon = ref<Weapon>('blade'), paused = ref(true), sound = ref(false), renderingError = ref(false), epoch = ref(0);
const panel = ref<'map' | 'journal' | 'build' | 'wardrobe' | 'person' | 'passage' | 'ending' | 'arrival' | 'restart' | null>(null);
const person = ref<Participant>('sanniang'), passage = ref<keyof typeof w.passages>('warning'), draft = ref(''), dialog = ref<HTMLElement | null>(null);
const transcript = ref<HTMLElement | null>(null);
const noticePanel = ref<HTMLElement | null>(null);
const field = ref<InstanceType<typeof ExplorationField> | null>(null);
const preview = createCampaign('preview', 1, 'blade', 'traveler');
const facts = computed<ReadonlySet<CourtyardFact>>(previous => {
    const ids = run.value?.facts ?? [];
    return previous && previous.size === ids.length && ids.every(id => previous.has(id)) ? previous : new Set(ids);
});
const world = computed(() => ({ definition: COURTYARD[run.value?.location.scene ?? 'camp'], location: run.value?.location ?? preview.location, facts: facts.value, people: run.value?.people ?? preview.people }));
const outfit = computed(() => run.value?.outfit ?? view.value?.data.equippedOutfit ?? 'traveler');
const halted = computed(() => !run.value || !!run.value.pendingParley || paused.value || !!panel.value || !!notice.value || talking.value || renderingError.value || props.generationActive
    || !['exploration', 'battle'].includes(run.value.phase) || !view.value?.ready || view.value.pending || view.value.writeState !== 'ready');
const boss = computed(() => run.value?.battle?.enemies.find(e => isBoss(e.kind)));
const history = computed(() => run.value?.conversations[person.value] ?? []);
const choices = computed(() => run.value && isPerson(person.value) ? availableChoices(run.value.facts, person.value, run.value.people[person.value]) : []);
const loadoutOptions = computed(() => run.value?.collection.map(relic => {
    const equipped = run.value!.equipped.includes(relic.id) ? run.value!.equipped.filter(id => id !== relic.id) : [...run.value!.equipped, relic.id];
    return { ...relic, equipped, issue: loadoutIssue(run.value!, equipped) };
}) ?? []);
const audio = createExpeditionSound(() => { client.error.value = COPY.presentationError.sound; sound.value = false; });
let mounted = false;
function close() {
    if (run.value?.pendingParley) { if (run.value.pendingParley.decision === 'pass') { void resolveParley(); } return; }
    panel.value = null; paused.value = true;
}
async function resolveParley() {
    if (await act({ type: 'resolve_parley' })) { panel.value = null; await nextTick(); field.value?.focus(); }
}
useAppLayer(dialog, close);
useAppBack(() => {
    if (panel.value) { close(); return true; }
    if (!paused.value) { pause(); return true; }
    return false;
});
useAppLayer(noticePanel, () => {
    if (!busy.value && !renderingError.value && !props.generationActive) { client.dismissError(); }
});
function pause() { paused.value = true; void playback.flush(); }
async function open(next: NonNullable<typeof panel.value>) {
    paused.value = true;
    if (await playback.flush()) { panel.value = next; }
}
async function resume() {
    if (run.value?.pendingParley) { if (run.value.pendingParley.decision === 'pass') { await resolveParley(); } return; }
    if (!notice.value && !props.generationActive) {
        panel.value = null; paused.value = false;
        await nextTick(); field.value?.focus();
    }
}
async function act(command: Command) {
    paused.value = true;
    if (!await playback.flush()) { return false; }
    const ok = await client.act(command);
    if (ok) {
        playback.sync();
        paused.value = false;
        if (!panel.value) { await nextTick(); field.value?.focus(); }
    }
    return ok;
}
async function start() { await act({ type: 'start', weapon: weapon.value, outfit: outfit.value }); }
async function restart() { if (await act({ type: 'restart', weapon: weapon.value, outfit: outfit.value })) { draft.value = ''; panel.value = null; } }
async function interact(id: string) {
    paused.value = true;
    if (!await playback.flush() || !run.value) { return; }
    const target = [...campaignInteractions(run.value), ...parleyInteractions(run.value.location.scene, run.value.location.position, new Set(run.value.facts))].find(item => item.target.id === id);
    const object = target?.kind === 'object' ? target.target : null;
    if (object?.kind === 'person') { person.value = object.person; draft.value = ''; panel.value = 'person'; return; }
    if (object?.kind === 'enemy') { person.value = object.enemy; draft.value = ''; panel.value = 'person'; return; }
    if (await act({ type: 'interact', id }) && object?.kind === 'inspect') { passage.value = object.passage; panel.value = 'passage'; }
}
async function send() {
    if (!draft.value.trim() || !await playback.flush()) { return; }
    const text = draft.value.trim();
    if (await client.talk(person.value, text)) {
        draft.value = ''; playback.sync();
    }
}
async function recover() { if (await playback.recover()) { paused.value = true; epoch.value++; } }
watch(() => props.generationActive, value => { if (value) { pause(); } });
watch(() => run.value?.pendingParley, pending => {
    if (pending) { person.value = pending.enemy; panel.value = 'person'; paused.value = true; }
}, { immediate: true });
watch(sound, value => { void audio.enable(value); });
watch(run, value => { if (sound.value && value?.battle) { audio.tick(value.battle); } });
// Every confirmed source (button, model, recovery or reattached window) presents the same transition.
watch(() => view.value?.data, (next, previous) => {
    if (!next?.active || !previous?.active || next.active.id !== previous.active.id) { return; }
    const before = new Set(previous.active.facts), after = new Set(next.active.facts);
    if (!before.has('chapter_completed') && after.has('chapter_completed')) { panel.value = 'ending'; }
    else if (!before.has('captives_arrived') && after.has('captives_arrived')) { panel.value = 'arrival'; }
});
watch(() => [panel.value, person.value, history.value.length, talking.value], async () => {
    await nextTick();
    if (transcript.value) { transcript.value.scrollTop = transcript.value.scrollHeight; }
});
onMounted(async () => { await client.read(); mounted = true; });
onActivated(() => { if (mounted && !dirty.value) { void client.read(); } });
onDeactivated(() => { pause(); });
onBeforeUnmount(() => { playback.dispose(); client.dispose(); audio.dispose(); });
</script>

<template>
    <section class="ember-campaign">
        <ExplorationField
            :key="epoch" ref="field" :world="world" :paused="halted" :weapon="run?.weapon ?? weapon" :outfit="outfit" :battle="run?.battle"
            @input="playback.input" @interact="interact" @pause="pause" @resume="resume" @error="renderingError = true"
        >
            <template #status>
                <template v-if="run">
                    <div class="ember-health"><meter :min="0" :max="RULES.maxHp" :value="run.hp" :aria-label="COPY.hp" /><span>{{ Math.ceil(run.hp) }} / {{ RULES.maxHp }}</span></div>
                    <p class="ember-objective">{{ campaignObjective(run) }}</p>
                    <small class="ember-save">{{ talking ? c.thinking : busy ? c.saving : dirty ? '' : c.saved }}</small>
                </template>
            </template>
            <template #overlay><span /></template>
        </ExplorationField>
        <nav v-if="run && !run.pendingParley" class="ember-tools" :aria-label="c.prepare">
            <button type="button" :aria-label="c.map" @click="open('map')"><ExpeditionIcon name="map" /><span>{{ c.map }}</span></button>
            <button type="button" :aria-label="c.build" @click="open('build')"><ExpeditionIcon name="bag" /><span>{{ c.build }}</span></button>
            <button type="button" :aria-label="c.journal" @click="open('journal')"><ExpeditionIcon name="journal" /><span>{{ c.journal }}</span></button>
            <button type="button" :aria-label="c.pause" @click="pause"><ExpeditionIcon name="pause" /></button>
        </nav>
        <div v-if="boss && !panel" class="ember-boss">
            <strong>{{ ENEMY_NAMES[boss.kind] }}</strong><meter min="0" :max="boss.maxHp" :value="boss.hp" :aria-label="ENEMY_NAMES[boss.kind]" />
        </div>
        <div v-if="run?.phase === 'battle' && ['gate', 'beacon'].includes(run.location.scene) && !facts.has('alarm_silenced')" class="ember-alarm">
            {{ facts.has('alarm_raised') ? c.alarmRaised : c.alarmSeconds(Math.ceil((CAMPAIGN_RULES.alarmTicks - run.alarmTicks) / RULES.hz)) }}
        </div>

        <section v-if="notice || renderingError || generationActive" ref="noticePanel" class="ember-notice" role="alertdialog" aria-modal="true" :aria-label="c.noticeTitle" tabindex="-1">
            <p>{{ renderingError ? c.renderError : generationActive ? c.generation : notice }}</p>
            <button v-if="renderingError" type="button" @click="renderingError = false; epoch++">{{ c.reload }}</button>
            <template v-else-if="client.dataInvalid.value && !generationActive">
                <p>{{ c.rebuildWarning }}</p><button type="button" :disabled="busy" @click="client.rebuild">{{ c.rebuild }}</button>
            </template>
            <button v-else-if="!generationActive" type="button" :disabled="busy" @click="client.recoveryRequired.value ? recover() : client.dismissError()">{{ client.recoveryRequired.value ? c.recover : c.acknowledge }}</button>
        </section>

        <aside v-if="conversationFailure && !notice && (panel !== 'person' || person !== conversationFailure.person)" class="ember-conversation-notice" role="status">
            <strong>{{ participantName(conversationFailure.person) }}</strong><p>{{ errorText(conversationFailure) }}</p>
            <details v-if="conversationFailure.text"><summary>{{ c.receivedReply }}</summary><p class="ember-prose">{{ conversationFailure.text }}</p></details>
            <button type="button" @click="client.dismissConversationFailure">{{ c.acknowledge }}</button>
        </aside>

        <section v-if="!run" class="ember-intro">
            <p class="ember-chapter">{{ c.chapter }}</p><h1>{{ c.title }}</h1><p class="ember-opening">{{ c.opening }}</p>
            <div class="ember-weapons" :aria-label="COPY.weapons">
                <button v-for="id in WEAPON_LIST" :key="id" type="button" :aria-pressed="weapon === id" @click="weapon = id"><ExpeditionIcon :name="id" /><span>{{ WEAPON_COPY[id].name }}</span></button>
            </div>
            <p class="ember-weapon-detail">{{ WEAPON_COPY[weapon].detail }}<small>{{ skillDetail(weapon) }}</small></p>
            <button class="ember-primary" type="button" :disabled="blocked || generationActive" @click="start">{{ view ? c.start : COPY.preparing }}</button>
        </section>

        <div v-else-if="!notice && !renderingError && !generationActive && (panel || paused || run.phase === 'reward' || run.phase === 'lost')" class="ember-curtain">
            <section ref="dialog" class="ember-panel" :class="{ 'ember-wide': panel === 'map' || panel === 'wardrobe', 'ember-map-panel': panel === 'map', 'ember-wardrobe-panel': panel === 'wardrobe', 'ember-dialogue': panel === 'person' }" role="dialog" aria-modal="true" :aria-label="panel === 'person' ? participantName(person) : c.chapter" tabindex="-1">
                <header v-if="panel !== 'map'" class="ember-panel-heading">
                    <h2 v-if="panel === 'wardrobe'">{{ c.wardrobe }}</h2><span v-else>{{ c.chapter }}</span>
                    <button v-if="run.pendingParley?.decision !== 'attack' && (panel || run.phase !== 'lost' && run.phase !== 'reward')" type="button" :disabled="!!run.pendingParley && blocked" @click="resume">{{ c.close }}</button>
                </header>
                <template v-if="panel === 'map'"><CampaignMap :campaign="run" @close="resume" /></template>
                <template v-else-if="panel === 'restart'">
                    <h2>{{ c.restart }}</h2><p>{{ c.restartWarning }}</p>
                    <div class="ember-weapons" :aria-label="COPY.weapons"><button v-for="id in WEAPON_LIST" :key="id" type="button" :aria-pressed="weapon === id" @click="weapon = id"><ExpeditionIcon :name="id" /><span>{{ WEAPON_COPY[id].name }}</span></button></div>
                    <p class="ember-weapon-detail">{{ WEAPON_COPY[weapon].detail }}<small>{{ skillDetail(weapon) }}</small></p>
                    <button class="ember-primary" type="button" :disabled="blocked" @click="restart">{{ c.restart }}</button>
                </template>
                <template v-else-if="panel === 'journal'">
                    <h2>{{ c.journal }}</h2><p class="ember-objective-panel">{{ campaignObjective(run) }}</p>
                    <ol class="ember-journal"><li v-for="fact in run.facts" :key="fact">{{ FACT_COPY[fact] }}</li></ol>
                </template>
                <template v-else-if="panel === 'build'">
                    <h2>{{ c.build }} <small>{{ c.slots(run.equipped.length, RULES.relicSlots) }}</small></h2>
                    <p>{{ WEAPON_COPY[run.weapon].name }} · {{ skillDetail(run.weapon) }}</p>
                    <p v-if="run.location.scene !== 'camp'">{{ c.safeBuild }}</p>
                    <p v-if="!run.collection.length">{{ c.emptyBuild }}</p>
                    <div class="ember-relics">
                        <article v-for="relic in loadoutOptions" :key="relic.id">
                            <ExpeditionIcon :name="relic.id" /><h3>{{ RELIC_COPY[relic.id].name }} <small>{{ COPY.rank(relic.rank) }}</small></h3><p>{{ RELIC_COPY[relic.id].detail }}</p>
                            <small v-if="relic.issue === 'dependency' || relic.issue === 'capacity'">{{ c.loadoutIssue[relic.issue] }}</small>
                            <button type="button" :disabled="blocked || !!relic.issue" @click="act({ type: 'loadout', equipped: relic.equipped })">{{ run.equipped.includes(relic.id) ? c.takeOff : c.putOn }}</button>
                        </article>
                    </div>
                </template>
                <template v-else-if="panel === 'wardrobe' && view">
                    <ExpeditionWardrobe :data="view.data" :balance="view.balance" :blocked="blocked" :weapon="run.weapon" @command="act" />
                </template>
                <template v-else-if="panel === 'person'">
                    <div class="ember-dialogue-heading"><h2>{{ participantName(person) }}</h2><ConversationMeters :key="person" :campaign="run" :person="person" :draft="draft" /></div>
                    <div ref="transcript" class="ember-dialogue-scroll" role="log" aria-live="polite">
                        <p v-if="!history.length" class="ember-greeting">{{ w.scenes[run.location.scene] }} · {{ participantName(person) }}</p>
                        <template v-for="turn in history" :key="turn.id">
                            <p v-if="turn.kind !== 'interaction'" class="ember-player-line"><small>{{ c.player }}</small>{{ turn.player }}</p>
                            <p v-if="turn.issue" class="ember-dialogue-issue">{{ dialogueCopy.issues[turn.issue] }}</p>
                            <details v-if="turn.kind === 'receipt'"><summary>{{ dialogueCopy.rawReply }}</summary><p class="ember-prose">{{ turn.reply }}</p></details>
                            <p v-else :class="turn.kind === 'interaction' ? 'ember-greeting' : 'ember-npc-line'">{{ turn.reply }}</p>
                        </template>
                        <div v-if="conversationFailure?.person === person && !history.some(turn => turn.id === conversationFailure?.actionId)" class="ember-dialogue-issue" role="status">
                            <p>{{ errorText(conversationFailure) }}</p>
                            <details v-if="conversationFailure.text"><summary>{{ c.receivedReply }}</summary><p class="ember-prose">{{ conversationFailure.text }}</p></details>
                            <button type="button" @click="client.dismissConversationFailure">{{ c.acknowledge }}</button>
                        </div>
                        <p v-if="talking">{{ c.thinking }}</p>
                    </div>
                    <div v-if="choices.length && !run.pendingParley" class="ember-choices">
                        <button v-for="id in choices" :key="id" :data-choice="id" type="button" :disabled="blocked" @click="isPerson(person) && act({ type: 'choice', id, person })">{{ CAMPAIGN_ACTIONS[id].label }}</button>
                    </div>
                    <button v-if="run.pendingParley?.decision === 'attack'" class="ember-primary" type="button" :disabled="blocked" @click="resolveParley">{{ dialogueCopy.fight }}</button>
                    <form v-if="!run.pendingParley" class="ember-chat-form" @submit.prevent="send">
                        <textarea v-model="draft" :maxlength="CAMPAIGN_RULES.playerTextLimit" :aria-label="c.input" :placeholder="c.input" :disabled="talking" rows="2" />
                        <button v-if="talking" type="button" @click="client.cancelTalk">{{ c.cancel }}</button><button v-else class="ember-primary" type="submit" :disabled="blocked || !draft.trim()">{{ c.send }}</button>
                    </form><small v-if="!run.pendingParley" class="ember-ai-note">{{ c.aiNotice }}</small>
                </template>
                <template v-else-if="panel === 'passage'"><h2>{{ w.passages[passage].title }}</h2><p class="ember-prose">{{ w.passages[passage].body }}</p></template>
                <template v-else-if="panel === 'arrival'"><h2>{{ w.scenes.camp }}</h2><p class="ember-prose">{{ c.received }}</p><button class="ember-primary" type="button" @click="resume">{{ c.resume }}</button></template>
                <template v-else-if="panel === 'ending'"><h2>{{ c.endingTitle }}</h2><p class="ember-prose">{{ c.ending }}</p><strong class="ember-continued">{{ c.continued }}</strong><p>{{ c.optional }}</p><button class="ember-primary" type="button" @click="resume">{{ c.remain }}</button></template>
                <template v-else-if="run.phase === 'reward'">
                    <h2>{{ c.reward }}</h2><p>{{ c.rewardDetail }}</p>
                    <div class="ember-relics"><button v-for="offer in run.offers" :key="offer.id" type="button" :disabled="blocked" @click="act({ type: 'relic', id: offer.id })"><ExpeditionIcon :name="offer.id" /><h3>{{ RELIC_COPY[offer.id].name }} <small>{{ COPY.rank(offer.rank) }}</small></h3><p>{{ RELIC_COPY[offer.id].detail }}</p></button></div>
                    <button type="button" :disabled="blocked" @click="act({ type: 'leave' })">{{ c.skip }}</button>
                </template>
                <template v-else-if="run.phase === 'lost'"><h2>{{ c.fallen }}</h2><p class="ember-prose">{{ c.fallenDetail }}</p><button class="ember-primary" type="button" :disabled="blocked" @click="act({ type: 'retry' })">{{ c.retry }}</button><button type="button" :disabled="blocked" @click="act({ type: 'retreat' })">{{ c.retreat }}</button></template>
                <template v-else>
                    <h2>{{ c.title }}</h2><p>{{ campaignObjective(run) }}</p><button class="ember-primary" type="button" :disabled="!!notice || generationActive" @click="resume">{{ c.resume }}</button>
                    <div class="ember-pause-actions"><button type="button" @click="open('map')">{{ c.map }}</button><button type="button" @click="open('build')">{{ c.build }}</button><button v-if="run.location.scene === 'camp'" type="button" @click="open('wardrobe')">{{ c.wardrobe }}</button><button type="button" :aria-pressed="sound" @click="sound = !sound">{{ c.sound }}</button></div>
                    <p class="ember-help ember-keyboard-help">{{ c.controls }}</p><p class="ember-help ember-touch-help">{{ c.touchControls }}</p>
                    <button v-if="run.location.scene === 'camp' && run.phase === 'exploration'" type="button" @click="weapon = run.weapon; open('restart')">{{ c.restart }}</button>
                </template>
            </section>
        </div>
    </section>
</template>
