<script setup lang="ts">
import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { useAppBack, useAppLayer } from '../../../shell/app-src/navigation/app-navigation.js';
import { COPY as c, HOUSE_NAMES } from './copy.js';
import { createStackingClient } from './client.js';
import { count, outcome, type Command } from './domain.js';
import { cashout, STACKING_POLICY as P } from './policy.js';
import { sequence } from './rules.js';
import { createStackingScene, type StackingScene } from './scene/runtime.js';
import { createStackingSound } from './sound.js';
import { createRecoveryJournal } from './recovery.js';
import HouseIcon from './HouseIcon.vue';
import './stacking.css';
const props = defineProps<{ bridge: XiaobaiOsFrameBridge; chatIdentity: string; generationActive: boolean }>();
// Access localStorage inside its methods so a denied storage permission becomes a visible recovery error.
const journal = createRecoveryJournal({ getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value), removeItem: key => localStorage.removeItem(key) });
const client = createStackingClient(props.bridge, props.chatIdentity, journal);
const { view, busy, blocked, failed, notice, generating } = client;
const canvas = ref<HTMLElement | null>(null), dialog = ref<HTMLElement | null>(null);
const modal = ref<'rules' | 'start' | 'abandon' | 'cashout' | null>(null);
const direction = ref<1 | -1>(1), paused = ref(false), archived = ref(false), animation = ref(false), activated = ref(true);
const graphicsError = ref(false), localError = ref(''), soundBusy = ref(false), collapsed = ref(false);
let scene: StackingScene | null = null, mounted = false;
const sound = createStackingSound();
const run = computed(() => archived.value ? view.value?.best ?? null : view.value?.active ?? null);
const status = computed(() => run.value ? outcome(run.value) : null);
const playing = computed(() => status.value === 'playing' && !archived.value);
const number = computed(() => run.value ? count(run.value) : 0);
const available = computed(() => cashout(number.value));
const kinds = computed(() => run.value ? sequence(run.value.seed) : []);
const currentKind = computed(() => kinds.value[run.value?.moves.length ?? 0]);
const nextKind = computed(() => kinds.value[(run.value?.moves.length ?? 0) + 1]);
const enabled = computed(() => activated.value && !blocked.value && !props.generationActive && !paused.value && !modal.value && !graphicsError.value);
const disabled = computed(() => !enabled.value || animation.value);
const weak = computed(() => view.value?.board?.supports[view.value.board.weak]);
useAppLayer(dialog, () => { modal.value = null; });
useAppBack(() => { if (archived.value) { archived.value = false; return true; } return false; });
function updateScene() {
    scene?.set({ run: run.value, direction: direction.value, overview: archived.value || !playing.value, enabled: enabled.value });
}
function mountScene() {
    scene?.dispose(); scene = null; graphicsError.value = false;
    try { scene = createStackingScene(canvas.value!, () => { graphicsError.value = true; void pauseSound(); }, value => { animation.value = value; }); updateScene(); }
    catch { graphicsError.value = true; }
}
async function pauseSound() { try { await sound.pause(); } catch { localError.value = c.soundError; } }
async function unlockSound() {
    if (!view.value?.soundEnabled) { return; }
    try { await sound.unlock(); } catch { localError.value = c.soundError; }
}
async function toggleSound() {
    if (soundBusy.value || !view.value) { return; }
    soundBusy.value = true; localError.value = '';
    try {
        const next = !view.value.soundEnabled;
        if (next) { await sound.unlock(); }
        await client.setSoundEnabled(next);
        if (!next) { await sound.pause(); }
    } catch { localError.value = c.soundError; }
    finally { soundBusy.value = false; }
}
async function act(command: Command) {
    void unlockSound();
    if (await client.act(command)) {
        archived.value = false; collapsed.value = false;
        if (command.type === 'start') { direction.value = 1; paused.value = false; }
        if (view.value?.soundEnabled) {
            const result = view.value.active ? outcome(view.value.active) : null;
            sound.play(result === 'lost' ? 'lose' : result === 'won' || result === 'cashed' ? 'reward' : 'land');
        }
    }
}
function drop() {
    if (disabled.value || !playing.value || !scene) { return; }
    const x = scene.coordinate();
    void unlockSound(); if (view.value?.soundEnabled) { sound.play('drop'); }
    void act({ type: 'drop', x, direction: direction.value });
}
function flip() { if (!disabled.value && playing.value) { direction.value = direction.value === 1 ? -1 : 1; void unlockSound(); } }
async function confirm() {
    const command = modal.value; modal.value = null;
    if (command && command !== 'rules') { await act({ type: command }); }
}
async function exportImage() {
    if (!scene) { return; }
    try {
        const blob = await scene.snapshot(), url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = c.exportName(number.value); link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { localError.value = c.exportError; }
}
function rotate(delta: number) { scene?.rotate(delta); }
function zoom(delta: number) { scene?.zoom(delta); }
function collapse() { scene?.collapse(); collapsed.value = true; }
function keydown(event: KeyboardEvent) {
    if (event.repeat || modal.value || (event.target as HTMLElement).closest('input, textarea, select')) { return; }
    if (event.code === 'Space' && !(event.target as HTMLElement).closest('button')) { event.preventDefault(); drop(); }
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') { event.preventDefault(); flip(); }
}
function visibility() { if (document.hidden) { void pauseSound(); } }
watch([run, direction, enabled, archived], updateScene);
watch(() => weak.value?.ratio, (value, previous) => {
    if (value !== undefined && value < 0.25 && (previous === undefined || previous >= 0.25) && view.value?.soundEnabled) { sound.play('danger'); }
});
watch([paused, modal, activated, graphicsError, () => props.generationActive], () => {
    if (paused.value || modal.value || !activated.value || graphicsError.value || props.generationActive) { void pauseSound(); }
});
onMounted(async () => { mountScene(); document.addEventListener('visibilitychange', visibility); await client.read(); mounted = true; });
onActivated(() => { activated.value = true; scene?.resume(); if (mounted) { void client.read(); } });
onDeactivated(() => { activated.value = false; scene?.suspend(); void pauseSound(); });
onBeforeUnmount(() => { client.dispose(); scene?.dispose(); document.removeEventListener('visibilitychange', visibility); void sound.dispose().catch(error => console.error(c.audioDispose, error)); });
async function reload() { await nextTick(); mountScene(); }
</script>
<template>
    <section class="stacking-room" tabindex="0" :aria-label="c.name" @keydown="keydown">
        <header class="stack-topbar">
            <div><strong>{{ view ? c.balance(view.balance) : c.loading }}</strong><small v-if="view?.best">{{ archived ? c.best : c.bestCount(count(view.best)) }}</small></div>
            <nav :aria-label="c.name"><button type="button" :disabled="soundBusy || busy || !view" :aria-pressed="view?.soundEnabled" @click="toggleSound">{{ view?.soundEnabled ? c.soundOn : c.soundOff }}</button><button type="button" @click="modal = 'rules'">{{ c.rules }}</button></nav>
        </header>
        <aside v-if="notice || failed || view?.pending || view?.writeState === 'failed'" class="stack-notice" role="alert">
            <span>{{ notice || c.saveProblem }}</span><button type="button" :disabled="busy" @click="client.recover">{{ c.recover }}</button><button type="button" :disabled="busy" @click="client.read">{{ c.refresh }}</button>
        </aside>
        <p v-if="localError" class="stack-notice" role="alert">{{ localError }}<button type="button" :aria-label="c.close" @click="localError = ''">×</button></p>
        <div class="stack-stage">
            <div ref="canvas" class="stack-canvas" :aria-label="c.name" role="img" />
            <div v-if="run" class="stack-hud"><strong>{{ c.progress(number) }}</strong><span v-if="playing && weak" :class="{ 'is-risk': weak.ratio < .25 }">{{ weak.ratio < .25 ? c.weak(weak.index) : c.stable }}</span></div>
            <div v-if="graphicsError" class="stack-overlay" role="alert"><p>{{ c.graphics }}</p><button type="button" @click="reload">{{ c.reload }}</button></div>
            <div v-else-if="playing && (paused || generationActive)" class="stack-pause"><span>{{ generationActive ? c.storyBusy : c.paused }}</span><button v-if="!generationActive" type="button" @click="paused = false">{{ c.play }}</button></div>
            <div v-if="run && !playing && !graphicsError" class="stack-view-controls">
                <button type="button" :aria-label="c.rotateLeft" @click="rotate(-.3)">↶</button><button type="button" :aria-label="c.rotateRight" @click="rotate(.3)">↷</button><button type="button" :aria-label="c.zoomIn" @click="zoom(-.12)">＋</button><button type="button" :aria-label="c.zoomOut" @click="zoom(.12)">−</button><button type="button" :disabled="animation" @click="exportImage">{{ c.export }}</button>
            </div>
        </div>
        <footer v-if="view" class="stack-controls">
            <template v-if="archived"><div class="stack-result"><strong>{{ c.bestCount(number) }}</strong><button type="button" @click="archived = false">{{ c.back }}</button></div></template>
            <template v-else-if="playing">
                <div class="stack-queue"><div v-if="currentKind"><HouseIcon :kind="currentKind" :direction="direction" /><span><small>{{ c.now }} · {{ c.orient(direction) }}</small>{{ HOUSE_NAMES[currentKind] }}</span></div><div v-if="nextKind" class="stack-next"><HouseIcon :kind="nextKind" /><span><small>{{ c.next }}</small>{{ HOUSE_NAMES[nextKind] }}</span></div></div>
                <div class="stack-actions"><button type="button" :disabled="disabled" @click="flip">{{ c.flip }}</button><button type="button" class="stack-primary" :disabled="disabled" @click="drop">{{ c.drop }} ↓</button><button v-if="available" type="button" :disabled="disabled" @click="modal = 'cashout'">{{ c.cash(available) }}</button><button v-else type="button" :disabled="busy || animation" @click="paused = !paused">{{ paused ? c.play : c.pause }}</button></div>
                <div class="stack-bottom"><span role="status">{{ generating ? c.generating : busy ? c.saving : c.saved }}</span><button type="button" :disabled="blocked || animation" @click="modal = 'abandon'">{{ c.abandon }}</button></div>
            </template>
            <template v-else>
                <div v-if="status" class="stack-result"><strong>{{ c[status as 'lost' | 'won' | 'cashed' | 'abandoned'] }}</strong><span v-if="run">{{ c.reward(view.award) }}</span></div>
                <p v-if="status === 'lost' && view.board?.failure" class="stack-reason">{{ c.failure[view.board.failure] }}<button v-if="!collapsed" type="button" @click="collapse">{{ c.collapse }}</button></p>
                <div class="stack-actions"><button type="button" class="stack-primary" :disabled="disabled || view.balance < P.fee" @click="modal = 'start'">{{ c.start }}</button><button v-if="view.best" type="button" @click="archived = true">{{ c.bestCount(count(view.best)) }}</button></div>
                <p v-if="view.balance < P.fee" class="stack-reason">{{ c.noFunds }}</p>
            </template>
        </footer>
        <div v-if="modal" class="stack-backdrop" @click.self="modal = null">
            <section ref="dialog" class="stack-dialog" role="dialog" aria-modal="true" aria-labelledby="stack-dialog-title" tabindex="-1">
                <header><h2 id="stack-dialog-title">{{ modal === 'rules' ? c.rules : modal === 'start' ? c.admissionTitle : modal === 'cashout' ? c.cashTitle : c.abandonTitle }}</h2><button type="button" :aria-label="c.close" @click="modal = null">×</button></header>
                <template v-if="modal === 'rules'"><ul><li v-for="line in c.ruleItems" :key="line">{{ line }}</li></ul><p>{{ c.stages }}</p></template>
                <template v-else><p>{{ modal === 'start' ? c.admissionBody : modal === 'cashout' ? c.cashBody : c.abandonBody }}</p><p v-if="modal === 'start'">{{ c.stages }}</p><div class="stack-actions"><button type="button" @click="modal = null">{{ c.cancel }}</button><button type="button" class="stack-primary" :disabled="blocked || generationActive" @click="confirm">{{ modal === 'start' ? c.start : modal === 'cashout' ? c.cash(available) : c.confirm }}</button></div></template>
            </section>
        </div>
    </section>
</template>
