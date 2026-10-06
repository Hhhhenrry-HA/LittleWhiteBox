<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue';
import { appendInput, tickBattle } from './combat.js';
import { isBoss, RULES } from './content.js';
import { COPY as c, WEAPON_COPY } from './copy.js';
import { createControls } from './controls.js';
import { createJoystick } from './joystick.js';
import { createExpeditionScene } from './scene.js';
import { createExpeditionSound } from './sound.js';
import { zoneOf } from './domain.js';
import type { ExpeditionClient } from './client.js';
import type { Battle, BattleHud, InputSpan, Outfit, PresentationError, Run, Weapon } from './types.js';
import ExpeditionIcon from './ExpeditionIcon.vue';

const props = defineProps<{ run: Run | null; client: ExpeditionClient; paused: boolean; camp: boolean; generationActive: boolean; weapon: Weapon; outfit: Outfit; sound: boolean }>();
const emit = defineEmits<{ pause: []; error: [reason: PresentationError]; hud: [battle: BattleHud | null] }>();
const root = ref<HTMLElement | null>(null), canvas = ref<HTMLElement | null>(null), knob = ref({ x: 0, y: 0 });
const cooldowns = ref({ dash: 0, skill: 0, shield: 0, resonance: 0 });
let scene: ReturnType<typeof createExpeditionScene> | null = null, controls: ReturnType<typeof createControls> | null = null;
let local: Battle | null = null, key = '', frame = 0, last = 0, hudTick = -1, accumulator = 0, tape: InputSpan[] = [], ticks = 0, sending = false, active = true, disposed = false;
const audio = createExpeditionSound(() => emit('error', 'sound'));
const joystick = createJoystick((x, y) => { knob.value = { x: x * 27, y: y * 27 }; controls?.stick(x, y); }, () => { root.value?.focus({ preventScroll: true }); });
function battleKey() { const r = props.run; return r ? `${r.id}:${r.step}:${r.phase === 'battle' ? 'battle' : 'between'}` : ''; }
function sync() {
    const run = props.run, nextKey = battleKey();
    if (nextKey !== key) {
        key = nextKey; local = run?.phase === 'battle' && run.battle ? structuredClone(run.battle) : null; tape = []; ticks = 0; hudTick = -1;
        clearInput();
        if (local) { root.value?.focus({ preventScroll: true }); publishHud(); } else { emit('hud', null); }
    }
}
function publishHud() {
    if (!local || local.tick === hudTick) { return; } hudTick = local.tick;
    cooldowns.value = { dash: local.player.dash, skill: local.player.skill, shield: local.player.shield, resonance: local.player.resonance };
    emit('hud', { player: { ...local.player }, enemies: local.enemies.filter(e => isBoss(e.kind)).map(e => ({ ...e })), wave: local.wave, waves: local.waves, tick: local.tick, objective: { ...local.objective }, encounter: local.encounter });
}
async function flush() {
    if (sending || !tape.length || props.client.blocked.value || props.generationActive) { return; }
    sending = true; const spans = tape; tape = []; ticks = 0;
    const ok = await props.client.act({ type: 'input', spans });
    sending = false;
    if (!ok) { emit('pause'); }
    else if (tape.length && (props.paused || local?.status !== 'fighting' || !active)) { void flush(); }
}
function clearInput() { joystick.clear(); controls?.clear(); }
function pause() { clearInput(); emit('pause'); void flush(); }
function visibility() { if (document.hidden) { pause(); } }
function render(now: number) {
    if (disposed || !active) { return; }
    frame = requestAnimationFrame(render);
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
        if (!document.hidden) { scene?.draw(local, props.camp ? { weapon: props.weapon, outfit: props.outfit } : props.run ?? { weapon: props.weapon, outfit: props.outfit },
            props.run ? zoneOf(props.run) : 0, props.camp ? 'camp' : local ? 'battle' : 'between', now); }
    }
    catch { emit('error', 'rendering'); pause(); cancelAnimationFrame(frame); }
}
// Install a new room before its controls can receive input, not in the following animation frame.
watch(battleKey, sync, { flush: 'sync' });
watch(() => props.paused, value => { if (value) { clearInput(); void flush(); } else { root.value?.focus({ preventScroll: true }); } });
watch(() => props.sound, value => { void audio.enable(value); });
watch(() => props.generationActive, value => { if (!value && props.paused) { void flush(); } });
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
onBeforeUnmount(() => { disposed = true; cancelAnimationFrame(frame); clearInput(); controls?.dispose(); document.removeEventListener('visibilitychange', visibility); scene?.dispose(); audio.dispose(); });
defineExpose({ flush });
</script>
<template>
    <div ref="root" class="exp-field" tabindex="0" :aria-label="c.controls">
        <div ref="canvas" class="exp-canvas" />
        <div v-if="run?.phase === 'battle' && !paused" class="exp-touch">
            <div class="exp-stick" role="group" :aria-label="c.touchMove" @pointerdown.prevent="joystick.down" @pointermove.prevent="joystick.move" @pointerup="joystick.release" @pointercancel="joystick.release" @lostpointercapture="joystick.release" @contextmenu.prevent>
                <span :style="{ transform: `translate(${knob.x}px, ${knob.y}px)` }" /><i aria-hidden="true" />
            </div>
            <div class="exp-combat-buttons">
                <div v-if="cooldowns.resonance > 0" class="exp-resonance-status" data-state="resonance"><ExpeditionIcon name="grimoire" /><strong>{{ c.resonanceActive }}</strong><b>{{ c.secondsLeft(cooldowns.resonance) }}</b></div>
                <button type="button" :aria-label="c.dash" :class="{ 'is-cooling': cooldowns.dash > 0 }" @pointerdown.prevent="dash()" @click="dash"><ExpeditionIcon name="dash" /><span>{{ cooldowns.dash ? (cooldowns.dash / RULES.hz).toFixed(1) : c.dash }}</span><kbd>{{ c.dashKey }}</kbd></button>
                <button type="button" :aria-label="WEAPON_COPY[run.weapon].action" :class="{ 'is-cooling': cooldowns.skill > 0, 'is-guarding': cooldowns.shield > 0, 'is-resonating': cooldowns.resonance > 0 }" @pointerdown.prevent="skill()" @click="skill"><ExpeditionIcon :name="cooldowns.shield ? 'aegis' : run.weapon" /><span>{{ cooldowns.shield ? c.guardActive : WEAPON_COPY[run.weapon].action }}</span><small v-if="cooldowns.skill && !cooldowns.shield">{{ (cooldowns.skill / RULES.hz).toFixed(1) }}</small><kbd>{{ c.skillKey }}</kbd></button>
            </div>
        </div>
    </div>
</template>
