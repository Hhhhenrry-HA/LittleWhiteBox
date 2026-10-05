<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import { appendInput, tickBattle } from './combat.js';
import { isBoss, RULES } from './content.js';
import { COPY as c } from './copy.js';
import { createControls } from './controls.js';
import { createExpeditionScene } from './scene.js';
import { createExpeditionSound } from './sound.js';
import type { ExpeditionClient } from './client.js';
import type { Battle, BattleHud, InputSpan, PresentationError, Run, Weapon } from './types.js';
import ExpeditionIcon from './ExpeditionIcon.vue';

const props = defineProps<{ run: Run | null; client: ExpeditionClient; paused: boolean; camp: boolean; generationActive: boolean; weapon: Weapon; cloak: number; sound: boolean }>();
const emit = defineEmits<{ pause: []; error: [reason: PresentationError]; hud: [battle: BattleHud | null] }>();
const root = ref<HTMLElement | null>(null), canvas = ref<HTMLElement | null>(null), knob = ref({ x: 0, y: 0 });
const cooldowns = ref({ dash: 0, skill: 0 });
let scene: ReturnType<typeof createExpeditionScene> | null = null, controls: ReturnType<typeof createControls> | null = null;
let local: Battle | null = null, key = '', frame = 0, last = 0, hudTick = -1, accumulator = 0, tape: InputSpan[] = [], ticks = 0, sending = false, active = true, disposed = false;
const audio = createExpeditionSound(() => emit('error', 'sound'));
function sync() {
    const run = props.run, nextKey = run ? `${run.id}:${run.step}:${run.phase === 'battle' ? 'battle' : 'between'}` : '';
    if (nextKey !== key) {
        key = nextKey; local = run?.phase === 'battle' && run.battle ? structuredClone(run.battle) : null; tape = []; ticks = 0; hudTick = -1;
        if (local) { controls?.clear(); root.value?.focus({ preventScroll: true }); publishHud(); } else { emit('hud', null); }
    }
}
function publishHud() {
    if (!local || local.tick === hudTick) { return; } hudTick = local.tick;
    cooldowns.value = { dash: local.player.dash, skill: local.player.skill };
    emit('hud', { player: { ...local.player }, enemies: local.enemies.filter(e => isBoss(e.kind)).map(e => ({ ...e })), wave: local.wave, waves: local.waves, tick: local.tick });
}
async function flush() {
    if (sending || !tape.length || props.client.blocked.value || props.generationActive) { return; }
    sending = true; const spans = tape; tape = []; ticks = 0;
    const ok = await props.client.act({ type: 'input', spans });
    sending = false;
    if (!ok) { emit('pause'); }
    else if (tape.length && (props.paused || local?.status !== 'fighting' || !active)) { void flush(); }
}
function clearInput() { controls?.clear(); pointer = null; knob.value = { x: 0, y: 0 }; }
function pause() { clearInput(); emit('pause'); void flush(); }
function visibility() { if (document.hidden) { pause(); } }
function render(now: number) {
    if (disposed || !active) { return; }
    frame = requestAnimationFrame(render); sync();
    const elapsed = last ? Math.min(100, now - last) : 0; last = now;
    const playable = !props.paused && !props.generationActive && !document.hidden && !props.client.failed.value
        && props.client.view.value?.writeState === 'ready' && ticks < RULES.maxInputTicks && local?.status === 'fighting';
    if (playable && local && props.run) {
        accumulator += elapsed;
        while (accumulator >= 1000 / RULES.hz && local.status === 'fighting' && ticks < RULES.maxInputTicks) {
            const input = controls!.frame(); tickBattle(local, input, props.run); appendInput(tape, input); ticks++;
            accumulator -= 1000 / RULES.hz; audio.tick(local);
        }
        if (ticks >= RULES.checkpointTicks || local.status !== 'fighting') { void flush(); }
        if (local.tick % 3 === 0 || local.status !== 'fighting') { publishHud(); }
    } else { accumulator = 0; }
    try {
        if (!document.hidden) { scene?.draw(local, props.camp ? { weapon: props.weapon, cloak: props.cloak } : props.run ?? { weapon: props.weapon, cloak: props.cloak },
            props.run ? Math.floor(props.run.step / RULES.zoneSteps) : 0, props.camp ? 'camp' : local ? 'battle' : 'between', now); }
    }
    catch { emit('error', 'rendering'); pause(); cancelAnimationFrame(frame); }
}
watch(() => props.paused, value => { if (value) { clearInput(); void flush(); } else { root.value?.focus({ preventScroll: true }); } });
watch(() => props.sound, value => { void audio.enable(value); });
watch(() => props.generationActive, value => { if (!value && props.paused) { void flush(); } });
let pointer: number | null = null;
function joystick(e: PointerEvent) {
    if (pointer !== e.pointerId) { return; }
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect(), x = (e.clientX - box.left - box.width / 2) / 38, y = (e.clientY - box.top - box.height / 2) / 38;
    const scale = Math.max(1, Math.hypot(x, y)); knob.value = { x: x / scale * 27, y: y / scale * 27 }; controls?.stick(x / scale, y / scale);
}
function down(e: PointerEvent) { pointer = e.pointerId; (e.currentTarget as HTMLElement).setPointerCapture(pointer); joystick(e); root.value?.focus({ preventScroll: true }); }
function release(e: PointerEvent) { if (pointer === e.pointerId) { pointer = null; knob.value = { x: 0, y: 0 }; controls?.stick(0, 0); } }
function dash(event?: MouseEvent) { if (!event || event.detail === 0) { controls?.dash(); } }
function skill(event?: MouseEvent) { if (!event || event.detail === 0) { controls?.skill(); } }
onMounted(() => {
    try { scene = createExpeditionScene(canvas.value!, () => { emit('error', 'rendering'); pause(); }); }
    catch { emit('error', 'rendering'); return; }
    controls = createControls(root.value!, pause, () => { if (props.sound) { void audio.enable(true); } });
    document.addEventListener('visibilitychange', visibility); sync(); frame = requestAnimationFrame(render); root.value?.focus({ preventScroll: true });
});
onDeactivated(() => { active = false; cancelAnimationFrame(frame); pause(); });
onActivated(() => { if (!active) { active = true; last = 0; frame = requestAnimationFrame(render); } });
onBeforeUnmount(() => { disposed = true; cancelAnimationFrame(frame); controls?.dispose(); document.removeEventListener('visibilitychange', visibility); scene?.dispose(); audio.dispose(); });
defineExpose({ flush });
</script>
<template>
    <div ref="root" class="exp-field" tabindex="0" :aria-label="c.controls">
        <div ref="canvas" class="exp-canvas" />
        <div v-if="run?.phase === 'battle' && !paused" class="exp-touch">
            <div class="exp-stick" role="group" :aria-label="c.touchMove" @pointerdown.prevent="down" @pointermove.prevent="joystick" @pointerup="release" @pointercancel="release" @lostpointercapture="release">
                <span :style="{ transform: `translate(${knob.x}px, ${knob.y}px)` }" /><i aria-hidden="true" />
            </div>
            <div class="exp-combat-buttons">
                <button type="button" :aria-label="c.dash" :class="{ 'is-cooling': cooldowns.dash > 0 }" @pointerdown.prevent="dash()" @click="dash"><ExpeditionIcon name="dash" /><span>{{ cooldowns.dash ? (cooldowns.dash / RULES.hz).toFixed(1) : c.dash }}</span><kbd>{{ c.dashKey }}</kbd></button>
                <button type="button" :aria-label="c.skill" :class="{ 'is-cooling': cooldowns.skill > 0 }" @pointerdown.prevent="skill()" @click="skill"><ExpeditionIcon :name="run.weapon" /><span>{{ cooldowns.skill ? (cooldowns.skill / RULES.hz).toFixed(1) : c.skill }}</span><kbd>{{ c.skillKey }}</kbd></button>
            </div>
        </div>
    </div>
</template>
