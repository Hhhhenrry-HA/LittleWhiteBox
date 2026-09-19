<script setup lang="ts">
import { computed, nextTick, ref, shallowRef } from 'vue';
import { COC7_ATTRIBUTES, COC7_CAPABILITIES, COC7_SKILLS, COC7_SKILL_GROUPS, COC7_SKILL_IDS, type Coc7Stat } from '../domain/coc7-catalog.js';
import { coc7Derived, coc7StatValue, editCoc7Stat, generateCoc7Sheet, parseCoc7Sheet, COC7_SHEET_ERRORS, type Coc7Sheet } from '../domain/coc7-sheet.js';
import { COC7_UI as copy } from './coc7-copy.js';
const props = defineProps<{ sheet: Coc7Sheet | null; invalid?: boolean; busy: boolean; save: (sheet: Coc7Sheet | null) => Promise<boolean> }>();
const draft = shallowRef<Coc7Sheet | null>(null);
const active = ref<{ stat: Coc7Stat; text: string } | null>(null);
const error = ref('');
const clearing = ref(false);
const field = ref<HTMLInputElement | null>(null);
const visible = computed(() => draft.value ?? props.sheet);
const derived = computed(() => visible.value ? coc7Derived(visible.value) : null);
const groups = Object.entries(COC7_SKILL_GROUPS).map(([id, label]) => ({ id, label, skills: COC7_SKILL_IDS.filter(skill => COC7_SKILLS[skill].group === id) }));
const attributes = [...Object.keys(COC7_ATTRIBUTES), 'luck'] as Coc7Stat[];
function startEdit(stat?: Coc7Stat) {
    if (!visible.value || props.busy) { return; }
    if (active.value && !applyValue()) { return; }
    draft.value ??= parseCoc7Sheet(visible.value);
    if (stat) { active.value = { stat, text: String(coc7StatValue(draft.value, stat)) }; }
    void nextTick(() => field.value?.focus());
    error.value = ''; clearing.value = false;
}
function applyValue(): boolean {
    if (!active.value || !draft.value) { return true; }
    try {
        const raw = active.value.text;
        if (!/^\d+$/.test(raw)) { throw new TypeError(COC7_SHEET_ERRORS.invalid); }
        draft.value = editCoc7Stat(draft.value, active.value.stat, Number(raw));
        active.value = null; error.value = '';
        return true;
    } catch (cause) {
        error.value = cause instanceof Error && cause.message === COC7_SHEET_ERRORS.belowBase ? copy.belowBase : copy.invalid;
        return false;
    }
}
async function saveDraft() {
    if (props.busy || !applyValue() || !draft.value) { return; }
    if (await props.save(draft.value)) { draft.value = null; error.value = ''; }
    else { error.value = copy.saveFailed; }
}
async function randomize() {
    if (props.busy) { return; }
    const initial = !props.sheet && !props.invalid && !draft.value;
    draft.value = generateCoc7Sheet(); active.value = null; error.value = ''; clearing.value = false;
    if (initial) { await saveDraft(); }
}
function cancel() { draft.value = null; active.value = null; error.value = ''; clearing.value = false; }
async function clear() {
    if (props.busy) { return; }
    if (await props.save(null)) { cancel(); }
    else { error.value = copy.clearFailed; }
}
</script>

<template>
    <section class="coc-sheet" aria-labelledby="coc-sheet-title">
        <header><h2 id="coc-sheet-title">{{ copy.title }}</h2><button v-if="sheet && !draft" type="button" :disabled="busy" @click="startEdit()">{{ copy.edit }}</button></header>
        <p class="coc-scope">{{ copy.scope }}</p>
        <div v-if="invalid" class="coc-recovery" data-sheet-state="invalid">
            <p role="alert" class="coc-error">{{ copy.damaged }}</p>
            <button v-if="!draft" type="button" data-sheet-action="replace" :disabled="busy" @click="randomize">{{ copy.replace }}</button>
        </div>
        <div v-if="!visible && !invalid" class="coc-empty">
            <span>{{ copy.empty }}</span><button type="button" class="primary" data-sheet-action="generate" :disabled="busy" @click="randomize">{{ copy.generate }}</button>
        </div>
        <template v-if="visible">
            <div class="coc-attributes">
                <button v-for="id in attributes" :key="id" type="button" :disabled="busy" :data-stat="id" :aria-pressed="active?.stat === id" @click="startEdit(id)">
                    <span>{{ COC7_CAPABILITIES[id].label }}<small v-if="id !== 'luck'">{{ id }}</small></span><strong>{{ coc7StatValue(visible, id) }}</strong>
                </button>
            </div>
            <dl v-if="derived" class="coc-derived"><div v-for="(value, key) in derived" :key="key"><dt>{{ copy[key] }}</dt><dd>{{ value }}</dd></div></dl>
            <form v-if="active" class="coc-editor" @submit.prevent="applyValue">
                <label for="coc-stat-value">{{ COC7_CAPABILITIES[active.stat].label }}</label>
                <input id="coc-stat-value" ref="field" v-model="active.text" type="text" inputmode="numeric" autocomplete="off" :disabled="busy" @keydown.esc.stop.prevent="active = null">
                <button type="submit" :disabled="busy">{{ copy.apply }}</button>
            </form>
            <details v-for="group in groups" :key="group.id" class="coc-skills">
                <summary>{{ group.label }}</summary>
                <div class="coc-skill-grid"><button v-for="id in group.skills" :key="id" type="button" :data-stat="id" :disabled="busy" :aria-pressed="active?.stat === id" @click="startEdit(id)"><span>{{ COC7_CAPABILITIES[id].label }}</span><strong>{{ coc7StatValue(visible, id) }}</strong></button></div>
            </details>
            <div v-if="draft" class="coc-draft-actions">
                <button type="button" data-sheet-action="reroll" :disabled="busy" @click="randomize">{{ copy.reroll }}</button>
                <button type="button" data-sheet-action="cancel" :disabled="busy" @click="cancel">{{ copy.cancel }}</button>
                <button type="button" class="primary" data-sheet-action="save" :disabled="busy" @click="saveDraft">{{ busy ? copy.saving : copy.save }}</button>
            </div>
        </template>
        <template v-if="(sheet || invalid) && !draft">
            <button v-if="!clearing" type="button" class="coc-clear" data-sheet-action="clear" :disabled="busy" @click="clearing = true">{{ copy.clear }}</button>
            <div v-else class="coc-clear-confirm"><p>{{ copy.clearNotice }}</p><button type="button" :disabled="busy" @click="clearing = false">{{ copy.cancel }}</button><button type="button" data-sheet-action="confirm-clear" :disabled="busy" @click="clear">{{ copy.confirmClear }}</button></div>
        </template>
        <p v-if="!sheet && !invalid || draft" class="coc-quick">{{ copy.quick }}</p>
        <p v-if="error" role="alert" class="coc-error">{{ error }}</p>
    </section>
</template>

<style scoped>
.coc-sheet { margin-top:24px; border-top:1px solid color-mix(in srgb,currentColor 15%,transparent); padding-top:20px; }
header { display:flex; align-items:center; justify-content:space-between; gap:12px; }
h2 { margin:0; font-size:17px; font-weight:650; }
button,input { color:inherit; font:inherit; }
button { min-height:44px; border:0; border-radius:8px; padding:6px 12px; background:transparent; cursor:pointer; }
button:hover { background:color-mix(in srgb,currentColor 7%,transparent); }
button:disabled { opacity:.5; cursor:wait; }
:is(button,input,summary):focus-visible { outline:2px solid #8577f0; outline-offset:2px; }
.coc-scope,.coc-quick { font-size:12px; opacity:.72; margin:4px 0 14px; }
.coc-empty { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 0; }
.coc-attributes { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
.coc-attributes button { display:flex; align-items:center; justify-content:space-between; gap:4px; padding:8px; background:color-mix(in srgb,currentColor 5%,transparent); }
.coc-attributes span { font-size:12px; text-align:left; }
small { display:block; font-size:10px; opacity:.65; }
strong { font-size:19px; font-weight:650; font-variant-numeric:tabular-nums; }
button[aria-pressed="true"] { box-shadow:inset 0 0 0 2px #8577f0; }
.coc-derived { display:flex; justify-content:space-between; gap:8px; margin:12px 0; font-size:12px; }
.coc-derived div { display:flex; flex-wrap:wrap; gap:4px; }
dt { opacity:.7; } dd { margin:0; font-variant-numeric:tabular-nums; }
.coc-editor { display:flex; align-items:center; flex-wrap:wrap; gap:8px; padding:8px 0; }
.coc-editor label { flex:1; min-width:90px; }
input { width:5rem; min-height:44px; box-sizing:border-box; padding:6px; border:1px solid color-mix(in srgb,currentColor 30%,transparent); border-radius:6px; background:transparent; }
.coc-skills { border-top:1px solid color-mix(in srgb,currentColor 12%,transparent); }
summary { min-height:44px; align-content:center; cursor:pointer; font-size:13px; }
.coc-skill-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:2px 8px; padding-bottom:8px; }
.coc-skill-grid button { display:flex; align-items:center; justify-content:space-between; gap:8px; text-align:left; padding:6px; font-size:12px; }
.coc-skill-grid strong { font-size:16px; }
.coc-draft-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:4px; padding:12px 0 4px; }
.coc-draft-actions button:first-child { margin-right:auto; }
button.primary { background:#7062d9; color:white; }
.coc-clear { margin-top:8px; font-size:12px; opacity:.7; }
.coc-clear-confirm { font-size:13px; }.coc-clear-confirm p { margin:8px 0; }
.coc-error { font-size:13px; color:var(--xiaobai-os-ink); border-left:3px solid #d47757; padding-left:10px; }
</style>
