<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import type { Campaign } from '../campaign/types.js';
import { isPerson, type Participant } from '../content/participants.js';
import { loadNarrativeCanon, type NarrativeCanon } from '../narrative/canon.js';
import { relationshipBand } from '../campaign/relationships.js';
import { conversationUsage } from '../narrative/usage.js';
import { DIALOGUE_COPY as c } from '../content/dialogue-copy.js';
import { errorText } from '../copy.js';
import { useAppBack } from '../../../../shell/app-src/navigation/app-navigation.js';

const props = defineProps<{ campaign: Campaign; person: Participant; draft: string }>();
const canon = shallowRef<NarrativeCanon | null>(null), open = ref<'affection' | 'context' | null>(null);
const change = ref(0), error = ref('');
let controller: AbortController | null = null, timer: ReturnType<typeof setTimeout> | undefined;
async function load() {
    controller?.abort(); controller = new AbortController(); const request = controller;
    canon.value = null; error.value = '';
    try { const loaded = await loadNarrativeCanon(props.person, request.signal); if (!request.signal.aborted) { canon.value = loaded; } }
    catch (cause) { if (!request.signal.aborted) { error.value = errorText(cause); } }
}
watch(() => props.person, () => { open.value = null; change.value = 0; void load(); }, { immediate: true });
const affection = computed(() => isPerson(props.person) ? props.campaign.relationships[props.person].affection : 0);
const name = computed(() => canon.value?.stages[relationshipBand(affection.value)]?.name ?? '');
const usage = computed(() => canon.value ? conversationUsage(props.campaign, props.person, props.draft, canon.value) : null);
watch(affection, (value, previous) => {
    if (timer) { clearTimeout(timer); } change.value = value - previous;
    timer = setTimeout(() => { change.value = 0; }, 2200);
});
useAppBack(() => { open.value = null; return true; }, () => !!open.value);
onBeforeUnmount(() => { controller?.abort(); if (timer) { clearTimeout(timer); } });
const format = (value: number) => `${(value / 1000).toFixed(1)}k`;
</script>

<template>
    <div class="ember-meters" @keydown.esc.stop="open = null">
        <button v-if="isPerson(person)" type="button" class="ember-meter-button" :aria-label="c.affection" :aria-expanded="open === 'affection'" @click="open = open === 'affection' ? null : 'affection'">
            <span class="ember-meter-ring ember-affection-ring" :style="{ '--meter-fill': `${affection * 3.6}deg` }"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20S3 14.5 3 8.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1C21 14.5 12 20 12 20Z" /></svg></span></span>
            <small v-if="change" class="ember-affection-change" :class="{ 'is-down': change < 0 }" role="status">{{ change > 0 ? '+' : '' }}{{ change }}</small>
        </button>
        <button type="button" class="ember-meter-button" :aria-label="c.context" :aria-expanded="open === 'context'" @click="open = open === 'context' ? null : 'context'">
            <span class="ember-meter-ring" :class="{ 'is-warning': usage && usage.used >= usage.trigger }" :style="{ '--meter-fill': `${Math.min(1, (usage?.used ?? 0) / (usage?.limit ?? 1)) * 360}deg` }"><span /></span>
        </button>
        <section v-if="open" class="ember-meter-popover">
            <header><strong>{{ open === 'affection' ? c.affection : c.context }}</strong><button type="button" :aria-label="c.close" @click="open = null">×</button></header>
            <template v-if="open === 'affection'"><p class="ember-meter-total">{{ affection }} <small>/ 100</small></p><p v-if="!error">{{ name || c.loading }}</p></template>
            <template v-else-if="usage">
                <p class="ember-meter-total">{{ format(usage.used) }} / {{ format(usage.limit) }}</p>
                <dl><template v-for="(label, key) in c.contextParts" :key="key"><dt>{{ label }}</dt><dd>{{ format(usage[key]) }}</dd></template></dl>
                <p>{{ c.threshold(usage.trigger - usage.used) }}</p><small>{{ c.estimate }}</small>
            </template><p v-else-if="!error">{{ c.loading }}</p>
            <template v-if="error"><p role="status">{{ error }}</p><button type="button" @click="load">{{ c.retry }}</button></template>
        </section>
    </div>
</template>

<style scoped>
.ember-meters{position:relative;display:flex;align-items:center;gap:2px;flex-shrink:0}
.ember-campaign .ember-meter-button{position:relative;display:grid;place-items:center;min-height:44px;width:44px;padding:8px;border:0;background:transparent}
.ember-meter-ring{--meter-fill:0deg;--meter-accent:#326b70;width:27px;height:27px;box-sizing:border-box;padding:3px;border-radius:50%;background:conic-gradient(var(--meter-accent) var(--meter-fill),#ceded6 0);display:grid;place-items:center;transition:background .25s}
.ember-meter-ring>span{width:100%;height:100%;border-radius:50%;background:#f3f7ee;display:grid;place-items:center}.ember-affection-ring{--meter-accent:#bb686f}.ember-meter-ring.is-warning{--meter-accent:#bd7b32}
svg{width:14px;height:14px;fill:#bb686f}.ember-affection-change{position:absolute;bottom:-12px;font-weight:650;color:#a5475e;pointer-events:none}.ember-affection-change.is-down{color:#647d90}
.ember-meter-popover{position:absolute;right:0;top:46px;z-index:6;width:min(260px,calc(100cqw - 64px));box-sizing:border-box;padding:12px 15px;background:#fbfdf7;box-shadow:0 5px 28px #163e4226;border:1px solid #ccddd1;border-radius:14px;font-size:12px;line-height:1.6}
.ember-meter-popover header{display:flex;align-items:center;justify-content:space-between;gap:10px}.ember-meter-popover strong{font-size:13px}.ember-campaign .ember-meter-popover button{min-height:32px;padding:0 10px;border:0;background:transparent}
.ember-campaign .ember-meter-total{font-size:21px;margin:8px 0 12px;font-variant-numeric:tabular-nums}.ember-meter-popover dl{display:grid;grid-template-columns:1fr auto;gap:7px}.ember-meter-popover dd{margin:0;font-variant-numeric:tabular-nums}.ember-meter-popover small{display:block;color:#5e7977;line-height:1.5}.ember-meter-total small{display:inline}
@media(min-width:650px) and (max-height:450px){.ember-meters{position:static}.ember-meter-popover{top:12px;right:20px;max-height:calc(100% - 24px);overflow:auto}}
@media(prefers-reduced-motion:reduce){.ember-meter-ring{transition:none}}
</style>
