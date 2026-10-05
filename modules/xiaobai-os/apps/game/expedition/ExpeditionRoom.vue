<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { useAppBack, useAppLayer } from '../../../shell/app-src/navigation/app-navigation.js';
import { createExpeditionClient } from './client.js';
import { COPY as c, CLOAK_NAMES, ENEMY_NAMES, OATH_COPY, RELIC_COPY, ROUTE_COPY, WEAPON_COPY, ZONE_NAMES } from './copy.js';
import { BOSSES, isBoss, OATHS, RELICS, RULES, WEAPONS } from './content.js';
import { isFinished, restAmount, weaponUnlocked, zoneOf } from './domain.js';
import ExpeditionField from './ExpeditionField.vue';
import type { BattleHud, Oath, PresentationError, Relic, Weapon } from './types.js';
import './expedition.css';
import ExpeditionIcon from './ExpeditionIcon.vue';
import { CLOAK_COLORS, RELIC_TINT } from './visuals.js';

const props = defineProps<{ bridge: XiaobaiOsFrameBridge; chatIdentity: string; generationActive: boolean }>();
const client = createExpeditionClient(props.bridge, props.chatIdentity);
const { view, busy, notice, blocked, failed } = client;
const run = computed(() => view.value?.data.active ?? null);
const weapon = ref<Weapon>('blade'), cloak = ref(0), oaths = ref<Oath[]>([]), paused = ref(true), sound = ref(false);
const hud = ref<BattleHud | null>(null), modal = ref<'abandon' | 'bag' | 'journal' | 'help' | null>(null), selecting = ref<Relic | null>(null);
const field = ref<InstanceType<typeof ExpeditionField> | null>(null), dialog = ref<HTMLElement | null>(null), sceneError = ref<PresentationError | null>(null), recoveryEpoch = ref(0);
const camp = ref(true); let mounted = false;
const weapons = Object.keys(WEAPONS) as Weapon[];
const live = computed(() => run.value && !isFinished(run.value));
const inBattle = computed(() => !camp.value && run.value?.phase === 'battle');
const stopped = computed(() => paused.value || camp.value || props.generationActive || !!notice.value || !!modal.value || !!sceneError.value);
const boss = computed(() => hud.value?.enemies.find(e => isBoss(e.kind)));
const hp = computed(() => inBattle.value && hud.value ? hud.value.player.hp : run.value?.hp ?? RULES.maxHp);
const full = computed(() => run.value?.relics.length === RULES.relicSlots);
const zone = computed(() => run.value ? zoneOf(run.value) : 0);
const nextBoss = computed(() => ENEMY_NAMES[BOSSES[zone.value]]);
const nextWeapon = computed(() => view.value && weapons.find(id => !weaponUnlocked(view.value!.data, id)));
const freshAwards = computed(() => view.value?.data.awards.filter(a => a.actionId === view.value?.data.last?.id) ?? []);
const runAward = computed(() => view.value?.data.awards.filter(a => a.runId === run.value?.id).reduce((sum, a) => sum + a.amount, 0) ?? 0);
const bossUnlocks = computed(() => {
    if (!freshAwards.value.length || run.value?.phase !== 'reward' || !run.value.battle?.boss) { return []; }
    const zone = run.value.battle.zone;
    return [...weapons.filter(id => WEAPONS[id].unlock === zone).map(id => WEAPON_COPY[id].name), CLOAK_NAMES[zone + 1]];
});
useAppLayer(dialog, () => { modal.value = null; selecting.value = null; });
useAppBack(() => {
    if (modal.value || selecting.value) { modal.value = null; selecting.value = null; return true; }
    if (!camp.value) { paused.value = true; camp.value = true; return true; } return false;
});
watch(() => props.generationActive, value => { if (value) { paused.value = true; } });
watch(() => run.value?.phase, phase => { if (phase !== 'battle') { hud.value = null; } });
function toggleOath(id: Oath) { oaths.value = oaths.value.includes(id) ? oaths.value.filter(v => v !== id) : [...oaths.value, id]; }
async function start() {
    if (await client.act({ type: 'start', weapon: weapon.value, cloak: cloak.value, oaths: oaths.value })) { camp.value = false; paused.value = false; }
}
async function route(id: number) { if (await client.act({ type: 'route', id })) { paused.value = false; } }
async function choose(id: Relic, replace: Relic | null = null) {
    if (full.value && replace === null) { selecting.value = id; return; }
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
        <ExpeditionField :key="recoveryEpoch" ref="field" :run="run" :client="client" :paused="stopped" :camp="camp" :generation-active="generationActive" :weapon="live ? run!.weapon : weapon" :cloak="live ? run!.cloak : cloak" :sound="sound" @pause="paused = true" @error="sceneError = $event" @hud="hud = $event" />
        <header class="exp-hud">
            <div v-if="!camp && run" class="exp-health">
                <span>{{ c.progress(ZONE_NAMES[zone], run.step % RULES.zoneSteps) }}</span>
                <div class="exp-health-track" role="progressbar" :aria-label="c.hp" :aria-valuenow="Math.ceil(hp)" :aria-valuemin="0" :aria-valuemax="RULES.maxHp"><i :style="{ width: hp / RULES.maxHp * 100 + '%' }" /><b>{{ Math.ceil(hp) }}<small> / {{ RULES.maxHp }}</small></b></div>
                <small :aria-label="c.shards + ' ' + run.shards"><ExpeditionIcon name="shrine" />{{ run.shards }} <span v-if="busy"> · {{ c.saving }}</span></small>
            </div>
            <span v-else class="exp-wallet" :aria-label="view ? c.wallet(view.balance) : c.preparing"><ExpeditionIcon name="coin" />{{ view ? view.balance : c.preparing }}</span>
            <nav class="exp-tools">
                <button type="button" :aria-label="c.sound" :aria-pressed="sound" @click="sound = !sound"><ExpeditionIcon :name="sound ? 'sound' : 'mute'" /></button>
                <button v-if="!camp" type="button" :aria-label="c.equipment" @click="openModal('bag')"><ExpeditionIcon name="bag" /></button>
                <button v-if="inBattle" type="button" :aria-label="c.pause" @click="paused = true"><ExpeditionIcon name="pause" /></button>
                <button v-else type="button" :aria-label="c.archive" @click="openModal('journal')"><ExpeditionIcon name="journal" /></button>
            </nav>
        </header>
        <aside v-if="notice || sceneError || generationActive" class="exp-notice" role="alert">
            <p>{{ sceneError ? c.presentationError[sceneError] : notice || c.story }}</p>
            <button v-if="notice || failed" type="button" :disabled="busy || generationActive" @click="recover">{{ c.retry }}</button>
            <button v-if="view?.writeState === 'conflict' || !view" type="button" :disabled="busy" @click="read">{{ c.refresh }}</button>
            <button v-if="sceneError === 'sound'" type="button" @click="sound = false; sceneError = null">{{ c.close }}</button>
        </aside>
        <div v-if="boss && !camp" class="exp-boss" role="progressbar" :aria-label="ENEMY_NAMES[boss.kind]" :aria-valuenow="Math.ceil(boss.hp)" :aria-valuemin="0" :aria-valuemax="Math.ceil(boss.maxHp)">
            <span><ExpeditionIcon name="boss" />{{ ENEMY_NAMES[boss.kind] }}<small>{{ c.bossPhase(boss.phase) }}</small></span>
            <div><i :style="{ width: boss.hp / boss.maxHp * 100 + '%' }" /></div>
        </div>
        <span v-else-if="hud && inBattle" class="exp-wave">{{ c.wave(hud.wave, hud.waves) }}</span>
        <div v-if="inBattle && hud && hud.tick < 54 && !stopped" class="exp-encounter" aria-hidden="true">
            <small>{{ c.chapter(zone) }}</small><strong>{{ boss ? ENEMY_NAMES[boss.kind] : ZONE_NAMES[zone] }}</strong>
        </div>

        <section v-if="camp && view" class="exp-camp">
            <div class="exp-title"><span>{{ c.titleFirst }}</span><span>{{ c.titleSecond }}</span></div>
            <template v-if="live">
                <p class="exp-camp-location">{{ ZONE_NAMES[zone] }}<span>{{ WEAPON_COPY[run!.weapon].name }}</span></p>
                <div class="exp-camp-relics"><ExpeditionIcon v-for="id in run!.relics" :key="id" :name="id" /></div>
                <button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="resume">{{ c.resume }}<ExpeditionIcon name="arrow" /></button>
                <button type="button" class="exp-quiet" @click="openModal('abandon')">{{ c.abandon }}</button>
            </template>
            <template v-else>
                <div class="exp-camp-loadout">
                    <div class="exp-weapon-select" :aria-label="c.weapons">
                        <button v-for="id in weapons" :key="id" type="button" :disabled="!weaponUnlocked(view.data, id)" :aria-pressed="weapon === id" :title="weaponUnlocked(view.data, id) ? WEAPON_COPY[id].detail : c.unlockWeapon(ENEMY_NAMES[BOSSES[WEAPONS[id].unlock]])" @click="weapon = id">
                            <ExpeditionIcon :name="id" /><span>{{ WEAPON_COPY[id].name }}<small v-if="!weaponUnlocked(view.data, id)">{{ c.lockedTag }}</small></span>
                            <ExpeditionIcon v-if="!weaponUnlocked(view.data, id)" class="exp-lock" name="lock" />
                        </button>
                    </div>
                    <p class="exp-weapon-detail">{{ WEAPON_COPY[weapon].detail }}<span>{{ WEAPON_COPY[weapon].skill }}</span></p>
                    <p v-if="nextWeapon" class="exp-next-unlock">{{ c.unlockReward(ENEMY_NAMES[BOSSES[WEAPONS[nextWeapon].unlock]], WEAPON_COPY[nextWeapon].name) }}</p>
                    <div class="exp-camp-options">
                        <div class="exp-cloaks" :aria-label="c.cloaks">
                            <button v-for="(name, index) in CLOAK_NAMES" :key="name" type="button" :disabled="index > view.data.bossClears.length" :aria-pressed="cloak === index" :aria-label="index > view.data.bossClears.length ? name + ' · ' + c.unlockCloak(index) : name" :title="index > view.data.bossClears.length ? c.unlockCloak(index) : name" :style="{ '--cloak': CLOAK_COLORS[index] }" @click="cloak = index"><i /><ExpeditionIcon v-if="index > view.data.bossClears.length" name="lock" /></button>
                        </div>
                        <button type="button" class="exp-help-button" :aria-label="c.help" @click="openModal('help')"><ExpeditionIcon name="help" /></button>
                    </div>
                    <details v-if="view.data.victories" class="exp-oaths">
                        <summary>{{ c.oaths }} <span>{{ oaths.length ? '· ' + oaths.length : '' }}</span></summary>
                        <label v-for="id in OATHS" :key="id"><input type="checkbox" :checked="oaths.includes(id)" @change="toggleOath(id)"><span>{{ OATH_COPY[id].name }}<small>{{ OATH_COPY[id].detail }}</small></span><b v-if="view.data.oathWins.includes(id)">✓</b></label>
                    </details>
                </div>
                <button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="start">{{ c.start }}<ExpeditionIcon name="arrow" /></button>
                <small class="exp-free">{{ c.free }}</small>
            </template>
        </section>

        <section v-else-if="run && !inBattle" class="exp-between" :class="{ 'exp-loot-screen': run.phase === 'reward' || run.phase === 'merchant', 'exp-decision-screen': run.phase === 'reward' || run.phase === 'merchant' || isFinished(run) }">
            <template v-if="run.phase === 'route'">
                <header class="exp-screen-heading"><small>{{ c.chapter(zone) }}</small><h2>{{ ZONE_NAMES[zone] }}</h2><p>{{ c.nextGoal(nextBoss) }}</p></header>
                <ol class="exp-map" :aria-label="c.journey"><li v-for="i in RULES.zoneSteps" :key="i" :class="{ 'is-past': i - 1 < run.step % RULES.zoneSteps, 'is-current': i - 1 === run.step % RULES.zoneSteps }"><ExpeditionIcon v-if="i === RULES.zoneSteps" name="boss" /><span v-else>{{ i }}</span></li></ol>
                <h3 class="exp-section-label">{{ c.route }}</h3>
                <div class="exp-route-options">
                    <button v-for="option in run.routes" :key="option.id" type="button" :disabled="blocked || generationActive" :data-route="option.kind" @click="route(option.id)"><ExpeditionIcon :name="option.kind" /><span><strong>{{ option.kind === 'boss' ? nextBoss : ROUTE_COPY[option.kind].name }}</strong><small>{{ ROUTE_COPY[option.kind].detail }}</small></span><ExpeditionIcon class="exp-option-arrow" name="arrow" /></button>
                </div>
            </template>
            <template v-else-if="run.phase === 'reward' || run.phase === 'merchant'">
                <div class="exp-decision-content">
                    <header class="exp-screen-heading"><small>{{ run.phase === 'merchant' ? ZONE_NAMES[zone] : run.battle?.boss ? c.bossDefeated(nextBoss) : c.victory }}</small><h2>{{ run.phase === 'reward' ? c.reward : c.merchant }}</h2></header>
                    <div v-if="freshAwards.length" class="exp-prize" role="status"><ExpeditionIcon name="coin" /><div><strong>{{ c.earned(freshAwards.reduce((sum, a) => sum + a.amount, 0)) }}</strong><small v-if="bossUnlocks.length">{{ c.newUnlocks(bossUnlocks) }}</small></div></div>
                    <div class="exp-relic-options">
                        <button v-for="id in run.offers" :key="id" type="button" :disabled="blocked || generationActive || run.phase === 'merchant' && run.shards < RULES.shopCost" :data-relic="id" :style="{ '--relic': RELIC_TINT[id] }" @click="choose(id)">
                            <div class="exp-relic-art"><ExpeditionIcon :name="id" /></div>
                            <span><small class="exp-relic-family">{{ RELIC_COPY[id].family }}</small><strong>{{ RELIC_COPY[id].name }}</strong><small>{{ RELIC_COPY[id].detail }}</small></span>
                        </button>
                    </div>
                    <p v-if="run.phase === 'merchant'" class="exp-muted">{{ c.buy(RULES.shopCost) }} · {{ run.shards < RULES.shopCost ? c.noShards : c.shards + ' ' + run.shards }}</p>
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
                    <div class="exp-result-build"><ExpeditionIcon v-for="id in run.relics" :key="id" :name="id" /></div>
                    <p class="exp-muted">{{ c.resultDetail }}</p>
                </div>
                <button type="button" class="exp-primary" @click="camp = true">{{ c.return }}<ExpeditionIcon name="arrow" /></button>
            </template>
        </section>

        <div v-if="inBattle && stopped && !modal && !notice && !sceneError" class="exp-pause-overlay"><section class="exp-panel"><ExpeditionIcon class="exp-pause-emblem" name="pause" /><h2>{{ c.paused }}</h2><p class="exp-muted">{{ c.controls }}</p><p>{{ WEAPON_COPY[run!.weapon].skill }}</p><button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="paused = false">{{ c.continue }}<ExpeditionIcon name="arrow" /></button><button type="button" class="exp-quiet" @click="camp = true">{{ c.return }}</button></section></div>
        <div v-if="inBattle && !stopped" class="exp-keyboard-hint">{{ c.moveKeys }}<span>{{ c.autoAttack }}</span></div>
        <div v-if="inBattle && run!.relics.length" class="exp-equipped-strip" :aria-label="c.equipped"><ExpeditionIcon v-for="id in run!.relics" :key="id" :name="id" /></div>

        <div v-if="modal || selecting" class="exp-modal-wrap" @click.self="modal = null; selecting = null">
            <section ref="dialog" class="exp-modal exp-panel" role="dialog" aria-modal="true" tabindex="-1" :aria-label="selecting ? c.replace : modal === 'journal' ? c.archive : modal === 'bag' ? c.equipment : modal === 'help' ? c.help : c.abandon">
                <header><h2>{{ selecting ? c.replace : modal === 'journal' ? c.archive : modal === 'bag' ? c.equipment : modal === 'help' ? c.help : c.abandon }}</h2><button type="button" :aria-label="c.close" @click="modal = null; selecting = null"><ExpeditionIcon name="close" /></button></header>
                <template v-if="selecting"><p>{{ RELIC_COPY[selecting].name }}</p><div class="exp-inventory"><button v-for="id in run!.relics" :key="id" type="button" :disabled="blocked" :style="{ '--relic': RELIC_TINT[id] }" @click="choose(selecting!, id)"><ExpeditionIcon :name="id" /><span><strong>{{ RELIC_COPY[id].name }}</strong><small>{{ RELIC_COPY[id].detail }}</small></span></button></div></template>
                <template v-else-if="modal === 'bag'"><p class="exp-muted">{{ c.slots(run?.relics.length ?? 0) }}</p><p v-if="!run?.relics.length">{{ c.noRelics }}</p><ul class="exp-inventory"><li v-for="id in run?.relics" :key="id" :style="{ '--relic': RELIC_TINT[id] }"><ExpeditionIcon :name="id" /><span><strong>{{ RELIC_COPY[id].name }}</strong><small>{{ RELIC_COPY[id].detail }}</small></span></li></ul></template>
                <template v-else-if="modal === 'help'"><p>{{ c.controls }}</p><p>{{ c.autoAttack }}</p><p>{{ c.lootPool }}</p><p>{{ c.checkpoint }}</p><p>{{ c.rewardRule }}</p></template>
                <template v-else-if="modal === 'abandon'"><p>{{ c.abandonBody }}</p><button type="button" class="exp-primary" :disabled="blocked || generationActive" @click="abandon">{{ c.confirm }}</button></template>
                <template v-else-if="modal === 'journal' && view"><h3>{{ c.discoveries }} {{ view.data.discoveries.length }} / {{ RELICS.length }}</h3><ul class="exp-collection"><li v-for="id in RELICS" :key="id" :class="{ 'is-unknown': !view.data.discoveries.includes(id) }"><ExpeditionIcon :name="view.data.discoveries.includes(id) ? id : 'lock'" /><strong>{{ view.data.discoveries.includes(id) ? RELIC_COPY[id].name : c.unknown }}</strong><small v-if="view.data.discoveries.includes(id)">{{ RELIC_COPY[id].detail }}</small></li></ul><h3>{{ c.history }}</h3><p v-if="!view.data.records.length">{{ c.journalEmpty }}</p><ul class="exp-list"><li v-for="record in view.data.records" :key="record.id"><strong>{{ WEAPON_COPY[record.weapon].name }} · {{ record.outcome === 'won' ? c.mastered : ZONE_NAMES[Math.floor(record.step / RULES.zoneSteps)] }}</strong><small>{{ c.stats(record.kills, record.ticks) }}</small></li></ul></template>
            </section>
        </div>
    </section>
</template>
