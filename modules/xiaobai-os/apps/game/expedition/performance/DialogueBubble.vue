<script setup lang="ts">
import type { Participant } from '../content/participants.js';
import type { Performance } from './catalog.js';
import DialogueActor from './DialogueActor.vue';
defineProps<{ person: Participant; reply: string; performance?: Performance; animate: boolean }>();
</script>

<template>
    <div class="ember-npc-bubble">
        <DialogueActor :person="person" :performance="performance" :animate="animate" />
        <p class="ember-npc-line">{{ reply }}</p>
    </div>
</template>

<style scoped>
.ember-npc-bubble { display:flow-root; padding:16px 18px; border:1px solid #dce1ee; border-radius:4px 16px 16px 16px; background:#fff; box-shadow:0 2px 8px #34477405; }
@container (max-width:450px) { .ember-npc-bubble { padding:12px 10px; } }
</style>
