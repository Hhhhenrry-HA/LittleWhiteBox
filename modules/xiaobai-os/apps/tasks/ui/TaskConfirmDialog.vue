<script setup lang="ts">
import { onMounted, ref } from 'vue';
defineProps<{ title: string; confirmLabel: string; busy: boolean; disabledReason: string; error: string }>();
const emit = defineEmits<{ close: []; confirm: [] }>();
const dialog = ref<HTMLDialogElement | null>(null);
onMounted(() => dialog.value?.showModal());

function handleKeydown(event: KeyboardEvent): void {
    event.stopPropagation();
    if (event.key !== 'Tab') {return;}
    const buttons = Array.from(dialog.value?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
    const first = buttons[0];
    const last = buttons.at(-1);
    if (!first) {event.preventDefault(); return;}
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
    }
}
</script>
<template>
    <dialog ref="dialog" class="tasks-dialog" :aria-label="title" @cancel.prevent="!busy && emit('close')" @keydown="handleKeydown">
        <h2 id="tasks-confirm-title">{{ title }}</h2>
        <div class="tasks-dialog-copy"><slot /></div>
        <p v-if="error" class="tasks-dialog-error" role="alert">{{ error }}</p>
        <p v-if="disabledReason && !busy" class="tasks-hint">{{ disabledReason }}</p>
        <footer><button type="button" class="tasks-secondary-button" :disabled="busy" autofocus @click="emit('close')">返回</button><button type="button" class="tasks-primary-button" :disabled="busy || Boolean(disabledReason)" @click="emit('confirm')">{{ busy ? '正在保存…' : confirmLabel }}</button></footer>
    </dialog>
</template>
