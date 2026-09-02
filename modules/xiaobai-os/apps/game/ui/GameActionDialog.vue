<script setup lang="ts">
defineProps<{
    heading: string;
    summary: string;
    confirmLabel: string;
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
            <div class="game-dialog-actions">
                <button type="button" @click="$emit('cancel')">再想想</button>
                <button type="button" class="is-primary" :class="{ 'is-danger': danger }" @click="$emit('confirm')">
                    {{ confirmLabel }}
                </button>
            </div>
        </section>
    </dialog>
</template>
