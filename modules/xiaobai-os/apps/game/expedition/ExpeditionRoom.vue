<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { useAppBack, useAppLayer } from '../../../shell/app-src/navigation/app-navigation.js';
import { createExpeditionClient } from './client.js';
import { awardTitle, COPY as c, ENCOUNTER_COPY, ENEMY_NAMES, OUTFIT_COPY, OATH_COPY, RELIC_COPY, ROUTE_COPY, WEAPON_COPY, ZONE_NAMES } from './copy.js';
import { isBoss, OATHS, RELICS, RULES, WEAPONS } from './content.js';
import { chapterOf, isFinished, restAmount, weaponUnlocked, zoneOf } from './domain.js';
import ExpeditionField from './ExpeditionField.vue';
import type { BattleHud, Oath, PresentationError, Relic, Weapon } from './types.js';
import './expedition.css';
import ExpeditionIcon from './ExpeditionIcon.vue';
import { RELIC_TINT } from './visuals.js';

import { breaksRelicTrigger, relicPrice } from './relics.js';
import { OUTFITS } from './outfits.js';
import { OUTFIT_IDS } from './ids.js';
import ExpeditionWardrobe from './ExpeditionWardrobe.vue';

const props = defineProps<{ bridge: XiaobaiOsFrameBridge; chatIdentity: string; generationActive: boolean }>();
const client = createExpeditionClient(props.bridge, props.chatIdentity);
const { view, busy, notice, blocked, failed } = client;
const run = computed(() => view.value?.data.active ?? null);
const weapon = ref<Weapon>('blade'), oaths = ref<Oath[]>([]), paused = ref(true), sound = ref(false);
const hud = ref<BattleHud | null>(null), modal = ref<'abandon' | 'bag' | 'journal' | 'help' | 'wardrobe' | 'oaths' | null>(null), selecting = ref<Relic | null>(null);
const field = ref<InstanceType<typeof ExpeditionField> | null>(null), dialog = ref<HTMLElement | null>(null), sceneError = ref<PresentationError | null>(null), recoveryEpoch = ref(0);
const noticeHost = ref<HTMLElement | null>(null), dialogNoticeHost = ref<HTMLElement | null>(null), noticePanel = ref<HTMLElement | null>(null);
const camp = ref(true); let mounted = false;
const journalTab = ref<'records' | 'relics' | 'awards'>('records');
const weapons = Object.keys(WEAPONS) as Weapon[];
const live = computed(() => run.value && !isFinished(run.value));
const inBattle = computed(() => !camp.value && run.value?.phase === 'battle');
const stopped = computed(() => paused.value || camp.value || props.generationActive || !!notice.value || !!modal.value || !!sceneError.value);
const boss = computed(() => hud.value?.enemies.find(e => isBoss(e.kind)));
const hp = computed(() => inBattle.value && hud.value ? hud.value.player.hp : run.value?.hp ?? RULES.maxHp);
const full = computed(() => run.value?.relics.length === RULES.relicSlots);
const zone = computed(() => run.value ? zoneOf(run.value) : 0);
const chapter = computed(() => run.value ? chapterOf(run.value) : 0);
const nextBoss = computed(() => run.value ? ENEMY_NAMES[run.value.bosses[chapter.value]] : '');
const outfit = computed(() => view.value?.data.equippedOutfit ?? 'traveler');
const objectiveText = computed(() => {
    const h = hud.value; if (!h) { return ''; }
    if (h.encounter === 'ritual') { return c.objectiveProgress(h.objective.progress, h.objective.target); }
    if (h.encounter === 'siege') { return c.beacon(h.objective.hp); }
    if (h.encounter === 'survival') { return c.survive(h.objective.target - h.objective.progress); }
    if (h.encounter === 'pursuit' && h.wave < h.waves) { return c.reinforcement(h.objective.target - h.objective.progress); }
    return c.wave(h.wave, h.waves);
});
const nextWeapon = computed(() => view.value && weapons.find(id => !weaponUnlocked(view.value!.data, id)));
const freshAwards = computed(() => view.value?.data.awards.filter(a => a.actionId === view.value?.data.last?.id) ?? []);
const runAward = computed(() => view.value?.data.awards.filter(a => a.runId === run.value?.id).reduce((sum, a) => sum + a.amount, 0) ?? 0);
const bossUnlocks = computed(() => {
    if (!freshAwards.value.length || run.value?.phase !== 'reward' || !run.value.battle?.boss) { return []; }
    const count = view.value!.data.bossClears.length;
    return [...weapons.filter(id => WEAPONS[id].unlock === count).map(id => WEAPON_COPY[id].name),
        ...OUTFIT_IDS.filter(id => freshAwards.value.some(a => a.key === OUTFITS[id].achievement)).map(id => OUTFIT_COPY[id].name)];
});
useAppLayer(dialog, () => { modal.value = null; selecting.value = null; });
useAppBack(() => {
    if (modal.value || selecting.value) { modal.value = null; selecting.value = null; return true; }
    if (!camp.value) { paused.value = true; camp.value = true; return true; } return false;
});
watch(() => props.generationActive, value => { if (value) { paused.value = true; } });
watch(() => run.value?.phase, phase => { if (phase !== 'battle') { hud.value = null; } });
watch(notice, async value => {
    if (value && (modal.value || selecting.value)) { await nextTick(); noticePanel.value?.focus({ preventScroll: true }); }
});
function toggleOath(id: Oath) { oaths.value = oaths.value.includes(id) ? oaths.value.filter(v => v !== id) : [...oaths.value, id]; }
async function start() {
    if (await client.act({ type: 'start', weapon: weapon.value, outfit: outfit.value, oaths: oaths.value })) { camp.value = false; paused.value = false; }
}
async function route(id: number) { if (await client.act({ type: 'route', id })) { paused.value = false; } }
async function choose(id: Relic, replace: Relic | null = null) {
    if (full.value && replace === null && !run.value?.relics.some(r => r.id === id)) { selecting.value = id; return; }
    if (await client.act({ type: 'relic', id, replace })) { selecting.value = null; }
}
async function recover() { if (await client.recover()) { recoveryEpoch.value++; paused.value = true; } }
async function abandon() { modal.value = null; await field.value?.flush(); if (await client.act({ type: 'abandon' })) { camp.value = true; } }
async function read() { if (await client.read()) { recoveryEpoch.value++; } }
function resume() { camp.value = false; paused.value = false; }
function openModal(value: typeof modal.value) { paused.value = true; modal.value = value; }
onMounted(async () => { await client.read(); mounted = true; });
onActivated(() => { if (mounted) { void read(); } });
onDeactivated(() => { paused.value = true; });
onBeforeUnmount(client.dispose);
</script>
<template>
    <section class="exp-app" :class="{ 'exp-is-battle': inBattle, 'exp-is-camp': camp, 'exp-is-between': !camp && !inBattle }" :data-zone="zone">
        <ExpeditionField :key="recoveryEpoch" ref="field" :run="run" :client="client" :paused="stopped" :camp="camp" :generation-active="generationActive" :weapon="live ? run!.weapon : weapon" :outfit="live ? run!.outfit : outfit" :sound="sound" @pause="paused = true" @error="sceneError = $event" @hud="hud = $event" />
        <header class="exp-hud">
            <div v-if="!camp && run" class="exp-health">
                <span>{{ c.progress(ZONE_NAMES[zone], run.step % RULES.zoneSteps) }}</span>
                <div class="exp-health-track" role="progressbar" :aria-label="c.hp" :aria-valuenow="Math.ceil(hp)" :aria-valuemin="0" :aria-valuemax="RULES.maxHp"><i :style="{ width: hp / RULES.maxHp * 100 + '%' }" /><b>{{ Math.ceil(hp) }}<small> / {{ RULES.maxHp }}</small></b></div>
                <span v-if="hud && hud.player.ward > 0" class="exp-ward-stat">{{ c.ward }} {{ Math.ceil(hud.player.ward) }}</span>
                <meter v-if="hud && ['blade', 'staff', 'grimoire'].includes(run.weapon)" class="exp-resource" min="0" max="100" :value="hud.player.resource" :aria-label="c.resource" />
                <small :aria-label="c.shards + ' ' + run.shards"><ExpeditionIcon name="shrine" />{{ run.shards }} <span v-if="busy"> · {{ c.saving }}</span></small>
            </div>
            <span v-else class="exp-wallet" :aria-label="view ? c.wallet(view.balance) : c.preparing"><ExpeditionIcon name="coin" />{{ view ? view.balance : c.preparing }}</span>
            <nav class="exp-tools">
                <button type="button" :aria-label="c.sound" :aria-pressed="sound" @click="sound = !sound"><ExpeditionIcon :name="sound ? 'sound' : 'mute'" /></button>
                <button v-if="camp && live" type="button" :aria-label="c.wardrobe" @click="openModal('wardrobe')"><ExpeditionIcon name="wardrobe" /></button>
                <button v-if="camp" type="button" :aria-label="c.help" @click="openModal('help')"><ExpeditionIcon name="help" /></button>
                <button v-if="!camp" type="button" :aria-label="c.equipment" @click="openModal('bag')"><ExpeditionIcon name="bag" /></button>
                <button v-if="inBattle" type="button" :aria-label="c.pause" @click="paused = true"><ExpeditionIcon name="pause" /></button>
                <button v-else type="button" :aria-label="c.archive" @click="openModal('journal')"><ExpeditionIcon name="journal" /></button>
            </nav>
        </header>
        <div ref="noticeHost" />
        <div v-if="boss && !camp" class="exp-boss" role="progressbar" :aria-label="ENEMY_NAMES[boss.kind]" :aria-valuenow="Math.ceil(boss.hp)" :aria-valuemin="0" :aria-valuemax="Math.ceil(boss.maxHp)">
            <span><ExpeditionIcon name="boss" />{{ ENEMY_NAMES[boss.kind] }}<small>{{ c.bossPhase(boss.phase) }}</small></span>
            <div><i :style="{ width: boss.hp / boss.maxHp * 100 + '%' }" /></div>
        </div>
        <span v-else-if="hud && inBattle" class="exp-wave"><strong>{{ ENCOUNTER_COPY[hud.encounter].name }}</strong> · {{ objectiveText }}</span>
        <div v-if="inBattle && hud && hud.tick < 54 && !stopped" class="exp-encounter" aria-hidden="true">
            <small>{{ c.chapter(chapter) }}</small><strong>{{ boss ? ENEMY_NAMES[boss.kind] : ENCOUNTER_COPY[hud.encounter].name }}</strong><p v-if="!boss">{{ ENCOUNTER_COPY[hud.encounter].detail }}</p>
        </div>

        <section v-if="camp && view" class="exp-camp">
            <div class="exp-title"><span>{{ c.titleFirst }}</span><span>{{ c.titleSecond }}</span></div>
            <template v-if="live">
                <p class="exp-camp-location">{{ ZONE_NAMES[zone] }}<span>{{ WEAPON_COPY[run!.weapon].name }}</span></p>
                <div class="exp-camp-relics"><ExpeditionIcon v-for="relic in run!.relics" :key="relic.id" :name="relic.id" :title="RELIC_COPY[relic.id].name + ' · ' + c.rank(relic.rank)" /></div>
                <button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="resume">{{ c.resume }}<ExpeditionIcon name="arrow" /></button>
                <button type="button" class="exp-quiet" @click="openModal('abandon')">{{ c.abandon }}</button>
            </template>
            <template v-else>
                <div class="exp-camp-loadout">
                    <div class="exp-weapon-select" :aria-label="c.weapons">
                        <button v-for="id in weapons" :key="id" type="button" :disabled="!weaponUnlocked(view.data, id)" :aria-pressed="weapon === id" :title="weaponUnlocked(view.data, id) ? WEAPON_COPY[id].detail : c.weaponUnlock(WEAPONS[id].unlock)" @click="weapon = id">
                            <ExpeditionIcon :name="id" /><span>{{ WEAPON_COPY[id].name }}<small v-if="!weaponUnlocked(view.data, id)">{{ c.lockedTag }}</small></span>
                            <ExpeditionIcon v-if="!weaponUnlocked(view.data, id)" class="exp-lock" name="lock" />
                        </button>
                    </div>
                    <p class="exp-weapon-detail">{{ WEAPON_COPY[weapon].detail }}<span>{{ WEAPON_COPY[weapon].skill }}</span></p>
                    <p v-if="nextWeapon" class="exp-next-unlock">{{ c.weaponUnlock(WEAPONS[nextWeapon].unlock) + ' · ' + WEAPON_COPY[nextWeapon].name }}</p>
                </div>
                <div class="exp-camp-options">
                    <button type="button" class="exp-wardrobe-entry" @click="openModal('wardrobe')"><ExpeditionIcon name="wardrobe" /><span>{{ c.wardrobe }}<small>{{ OUTFIT_COPY[outfit].name }}</small></span></button>
                    <button type="button" class="exp-difficulty-entry" @click="openModal('oaths')">{{ c.oaths }}<small>{{ oaths.length ? c.oathCount(oaths.length) : c.normal }}</small></button>
                </div>
                <button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="start">{{ c.start }}<ExpeditionIcon name="arrow" /></button>
            </template>
        </section>

        <section v-else-if="run && !inBattle" class="exp-between" :class="{ 'exp-loot-screen': run.phase === 'reward' || run.phase === 'merchant', 'exp-decision-screen': run.phase === 'reward' || run.phase === 'merchant' || isFinished(run) }">
            <template v-if="run.phase === 'route'">
                <header class="exp-screen-heading"><small>{{ c.chapter(chapter) }}</small><h2>{{ ZONE_NAMES[zone] }}</h2><p>{{ c.nextGoal(nextBoss) }}</p></header>
                <ol class="exp-map" :aria-label="c.journey"><li v-for="i in RULES.zoneSteps" :key="i" :class="{ 'is-past': i - 1 < run.step % RULES.zoneSteps, 'is-current': i - 1 === run.step % RULES.zoneSteps }"><ExpeditionIcon v-if="i === RULES.zoneSteps" name="boss" /><span v-else>{{ i }}</span></li></ol>
                <h3 class="exp-section-label">{{ c.route }}</h3>
                <div class="exp-route-options">
                    <button v-for="option in run.routes" :key="option.id" type="button" :disabled="blocked || generationActive" :data-route="option.kind" @click="route(option.id)"><ExpeditionIcon :name="option.kind" /><span><strong>{{ option.kind === 'boss' ? nextBoss : ROUTE_COPY[option.kind].name }}</strong><small>{{ ['battle', 'elite'].includes(option.kind) ? ENCOUNTER_COPY[option.encounter].name + ' · ' + ROUTE_COPY[option.kind].detail : ROUTE_COPY[option.kind].detail }}</small></span><ExpeditionIcon class="exp-option-arrow" name="arrow" /></button>
                </div>
            </template>
            <template v-else-if="run.phase === 'reward' || run.phase === 'merchant'">
                <div class="exp-decision-content">
                    <header class="exp-screen-heading"><small>{{ run.phase === 'merchant' ? ZONE_NAMES[zone] : run.battle?.boss ? c.bossDefeated(nextBoss) : c.victory }}</small><h2>{{ run.phase === 'reward' ? c.reward : c.merchant }}</h2></header>
                    <div v-if="freshAwards.length" class="exp-prize" role="status"><ExpeditionIcon name="coin" /><div><strong>{{ c.earned(freshAwards.reduce((sum, a) => sum + a.amount, 0)) }}</strong><small v-if="bossUnlocks.length">{{ c.newUnlocks(bossUnlocks) }}</small></div></div>
                    <div class="exp-relic-options">
                        <button v-for="offer in run.offers" :key="offer.id" type="button" :disabled="blocked || generationActive || run.phase === 'merchant' && run.shards < relicPrice(offer)" :data-relic="offer.id" :style="{ '--relic': RELIC_TINT[offer.id] }" @click="choose(offer.id)">
                            <div class="exp-relic-art"><ExpeditionIcon :name="offer.id" /><b>{{ c.rank(offer.rank) }}</b></div>
                            <span><small class="exp-relic-family">{{ run.relics.some(r => r.id === offer.id) ? c.upgrade(offer.rank) : RELIC_COPY[offer.id].family + ' · ' + c.newRelic }}</small><strong>{{ RELIC_COPY[offer.id].name }}</strong><small>{{ RELIC_COPY[offer.id].detail }}</small><b v-if="run.phase === 'merchant'" class="exp-relic-price">{{ c.buy(relicPrice(offer)) }}</b></span>
                        </button>
                    </div>
                    <p v-if="!run.offers.length" class="exp-muted">{{ c.noOffers }}</p>
                    <p class="exp-muted exp-upgrade-hint">{{ c.upgradeHint }}</p>
                    <button v-if="run.phase === 'merchant'" type="button" class="exp-supply" :disabled="blocked || generationActive || run.shards < RULES.supplyCost || run.hp >= RULES.maxHp" @click="client.act({ type: 'supply' })"><ExpeditionIcon name="heart" /><span>{{ c.supply }} · {{ c.buy(RULES.supplyCost) }}<small>{{ c.supplyDetail(RULES.supplyHeal * (run.oaths.includes('scarcity') ? .5 : 1)) }}</small></span></button>
                </div>
                <button type="button" class="exp-quiet" :disabled="blocked || generationActive" @click="client.act({ type: 'leave' })">{{ run.phase === 'reward' ? c.discard : c.leave }}</button>
            </template>
            <template v-else-if="run.phase === 'camp' || run.phase === 'shrine'">
                <ExpeditionIcon class="exp-landmark" :name="run.phase" /><header class="exp-screen-heading"><h2>{{ ROUTE_COPY[run.phase].name }}</h2><p>{{ run.phase === 'camp' ? c.restDetail(restAmount(run)) : c.sacrifice }}</p></header>
                <button v-if="run.phase === 'camp'" type="button" class="exp-primary" :disabled="blocked || generationActive" @click="client.act({ type: 'rest' })">{{ c.rest }}<ExpeditionIcon name="heart" /></button>
                <template v-else><button type="button" class="exp-primary" :disabled="blocked || generationActive || hp <= RULES.sacrificeHp" @click="client.act({ type: 'sacrifice' })">{{ hp <= RULES.sacrificeHp ? c.healthCost : c.shrine }}<ExpeditionIcon name="shrine" /></button><button type="button" class="exp-quiet" :disabled="blocked || generationActive" @click="client.act({ type: 'leave' })">{{ c.leave }}</button></template>
            </template>
            <template v-else-if="isFinished(run)">
                <div class="exp-decision-content">
                    <ExpeditionIcon class="exp-landmark" :name="run.phase === 'won' ? 'crown' : 'renewal'" />
                    <header class="exp-screen-heading"><small>{{ WEAPON_COPY[run.weapon].name }}</small><h2>{{ run.phase === 'won' ? c.won : run.phase === 'lost' ? c.lost : c.abandoned }}</h2></header>
                    <p class="exp-result-stats">{{ c.stats(run.kills, run.ticks) }}</p><div class="exp-prize"><ExpeditionIcon name="coin" /><strong>{{ c.gold(runAward) }}</strong></div>
                    <div class="exp-result-build"><ExpeditionIcon v-for="relic in run.relics" :key="relic.id" :name="relic.id" :title="RELIC_COPY[relic.id].name + ' · ' + c.rank(relic.rank)" /></div>
                    <p class="exp-muted">{{ c.resultDetail }}</p>
                </div>
                <button type="button" class="exp-primary" @click="camp = true">{{ c.return }}<ExpeditionIcon name="arrow" /></button>
            </template>
        </section>

        <div v-if="inBattle && stopped && !modal && !notice && !sceneError" class="exp-pause-overlay"><section class="exp-panel"><ExpeditionIcon class="exp-pause-emblem" name="pause" /><h2>{{ c.paused }}</h2><p class="exp-muted">{{ c.controls }}</p><p>{{ WEAPON_COPY[run!.weapon].skill }}</p><button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="paused = false">{{ c.continue }}<ExpeditionIcon name="arrow" /></button><button type="button" class="exp-quiet" @click="camp = true">{{ c.return }}</button></section></div>
        <div v-if="inBattle && !stopped" class="exp-keyboard-hint">{{ c.moveKeys }}<span>{{ c.autoAttack }}</span></div>
        <div v-if="inBattle && run!.relics.length" class="exp-equipped-strip" :aria-label="c.equipped"><ExpeditionIcon v-for="relic in run!.relics" :key="relic.id" :name="relic.id" :title="RELIC_COPY[relic.id].name + ' · ' + c.rank(relic.rank)" /></div>

        <div v-if="modal || selecting" class="exp-modal-wrap" @click.self="modal = null; selecting = null">
            <section ref="dialog" class="exp-modal exp-panel" :class="{ 'exp-wardrobe-modal': modal === 'wardrobe' }" role="dialog" aria-modal="true" tabindex="-1" :aria-label="selecting ? c.replace : modal === 'wardrobe' ? c.wardrobe : modal === 'oaths' ? c.oaths : modal === 'journal' ? c.archive : modal === 'bag' ? c.equipment : modal === 'help' ? c.help : c.abandon">
                <header><h2>{{ selecting ? c.replace : modal === 'wardrobe' ? c.wardrobe : modal === 'oaths' ? c.oaths : modal === 'journal' ? c.archive : modal === 'bag' ? c.equipment : modal === 'help' ? c.help : c.abandon }}</h2><button type="button" :aria-label="c.close" @click="modal = null; selecting = null"><ExpeditionIcon name="close" /></button></header>
                <div ref="dialogNoticeHost" class="exp-dialog-notice-host" />
                <ExpeditionWardrobe v-if="modal === 'wardrobe' && view" :data="view.data" :balance="view.balance" :blocked="blocked || generationActive" :weapon="live ? run!.weapon : weapon" @command="client.act($event)" />
                <template v-else-if="modal === 'oaths' && view">
                    <div class="exp-oaths">
                        <p v-if="!view.data.victories">{{ c.oathsLocked }}</p>
                        <label v-for="id in OATHS" :key="id"><input type="checkbox" :checked="oaths.includes(id)" :disabled="!view.data.victories" @change="toggleOath(id)"><span>{{ OATH_COPY[id].name }}<small>{{ OATH_COPY[id].detail }}</small></span><b v-if="view.data.oathWins.includes(id)">✓</b></label>
                    </div>
                </template>
                <template v-else-if="selecting"><p>{{ RELIC_COPY[selecting].name }}</p><div class="exp-inventory"><button v-for="relic in run!.relics" :key="relic.id" type="button" :disabled="blocked || breaksRelicTrigger(run!, selecting!, relic.id)" :title="breaksRelicTrigger(run!, selecting!, relic.id) ? c.requiredRelic : undefined" :style="{ '--relic': RELIC_TINT[relic.id] }" @click="choose(selecting!, relic.id)"><ExpeditionIcon :name="relic.id" /><span><strong>{{ RELIC_COPY[relic.id].name }} · {{ c.rank(relic.rank) }}</strong><small>{{ breaksRelicTrigger(run!, selecting!, relic.id) ? c.requiredRelic : RELIC_COPY[relic.id].detail }}</small></span></button></div></template>
                <template v-else-if="modal === 'bag'"><p class="exp-muted">{{ c.slots(run?.relics.length ?? 0) }}</p><p v-if="!run?.relics.length">{{ c.noRelics }}</p><ul class="exp-inventory"><li v-for="relic in run?.relics" :key="relic.id" :style="{ '--relic': RELIC_TINT[relic.id] }"><ExpeditionIcon :name="relic.id" /><span><strong>{{ RELIC_COPY[relic.id].name }} · {{ c.rank(relic.rank) }}</strong><small>{{ RELIC_COPY[relic.id].detail }}</small></span></li></ul></template>
                <template v-else-if="modal === 'help'"><p>{{ c.controls }}</p><p>{{ c.autoAttack }}</p><p>{{ c.lootPool }}</p><p>{{ c.checkpoint }}</p><p>{{ c.rewardRule }}</p></template>
                <template v-else-if="modal === 'abandon'"><p>{{ c.abandonBody }}</p><button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="abandon">{{ c.confirm }}</button></template>
                <template v-else-if="modal === 'journal' && view">
                    <nav class="exp-journal-tabs">
                        <button type="button" :aria-pressed="journalTab === 'records'" @click="journalTab = 'records'">{{ c.history }}</button>
                        <button type="button" :aria-pressed="journalTab === 'relics'" @click="journalTab = 'relics'">{{ c.discoveries }}</button>
                        <button type="button" :aria-pressed="journalTab === 'awards'" @click="journalTab = 'awards'">{{ c.awardHistory }}</button>
                    </nav>
                    <template v-if="journalTab === 'relics'"><h3>{{ c.discoveries }} {{ view.data.discoveries.length }} / {{ RELICS.length }}</h3><ul class="exp-collection"><li v-for="id in RELICS" :key="id" :class="{ 'is-unknown': !view.data.discoveries.includes(id) }"><ExpeditionIcon :name="view.data.discoveries.includes(id) ? id : 'lock'" /><strong>{{ view.data.discoveries.includes(id) ? RELIC_COPY[id].name : c.unknown }}</strong><small v-if="view.data.discoveries.includes(id)">{{ RELIC_COPY[id].detail }}</small></li></ul></template>
                    <template v-else-if="journalTab === 'awards'">
                        <p>{{ c.totalEarned(view.data.awards.reduce((sum, a) => sum + a.amount, 0)) }}</p>
                        <p class="exp-muted">{{ c.rewardRule }}</p><p v-if="!view.data.awards.length">{{ c.noAwards }}</p>
                        <ul class="exp-list exp-receipts"><li v-for="award in [...view.data.awards].reverse()" :key="award.key"><strong>{{ awardTitle(award.key) }}</strong><b>+{{ award.amount }}</b><details><summary>{{ c.receipt }}</summary><code>{{ award.actionId }}</code></details></li></ul>
                    </template>
                    <template v-else><p v-if="!view.data.records.length">{{ c.journalEmpty }}</p><ul class="exp-list"><li v-for="record in view.data.records" :key="record.id"><strong>{{ WEAPON_COPY[record.weapon].name }} · {{ record.outcome === 'won' ? c.mastered : c.reached(Math.floor(record.step / RULES.zoneSteps)) }}</strong><small>{{ c.stats(record.kills, record.ticks) }}</small></li></ul></template>
                </template>
            </section>
        </div>
        <Teleport v-if="noticeHost" :to="dialogNoticeHost ?? noticeHost">
            <aside v-if="notice || sceneError || generationActive" ref="noticePanel" class="exp-notice" role="alert" tabindex="-1">
                <p>{{ sceneError ? c.presentationError[sceneError] : notice || c.story }}</p>
                <button v-if="notice || failed" type="button" :disabled="busy || generationActive" @click="recover">{{ c.retry }}</button>
                <button v-if="view?.writeState === 'conflict' || !view" type="button" :disabled="busy" @click="read">{{ c.refresh }}</button>
                <button v-if="sceneError === 'sound'" type="button" @click="sound = false; sceneError = null">{{ c.close }}</button>
            </aside>
        </Teleport>
    </section>
</template>
