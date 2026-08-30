<script setup lang="ts">
defineProps<{
    heading: string;
    summary: string;
    confirmLabel: string;
    busy: boolean;
    error: string;
    danger?: boolean;
}>();

defineEmits<{
    cancel: [];
    confirm: [];
}>();
</script>

<template>
    <dialog open class="game-dialog" @cancel.prevent="$emit('cancel')">
        <section class="game-dialog-card">
            <span class="game-eyebrow">FINAL CALL</span>
            <h2>{{ heading }}</h2>
            <p>{{ summary }}</p>
            <p v-if="error" class="game-inline-error" role="status">{{ error }}</p>
            <div class="game-dialog-actions">
                <button type="button" :disabled="busy" @click="$emit('cancel')">再想想</button>
                <button type="button" class="is-primary" :class="{ 'is-danger': danger }" :disabled="busy" @click="$emit('confirm')">
                    {{ busy ? '正在落账…' : confirmLabel }}
                </button>
            </div>
        </section>
    </dialog>
</template>
