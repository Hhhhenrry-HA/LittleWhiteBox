<script setup lang="ts">
defineProps<{
    kicker?: string;
    title: string;
}>();
</script>

<template>
    <header class="wallet-ui-header">
        <div class="wallet-ui-header-copy">
            <span v-if="kicker" class="wallet-ui-kicker">{{ kicker }}</span>
            <h1 class="wallet-ui-title">{{ title }}</h1>
        </div>
        <div v-if="$slots.actions" class="wallet-ui-header-actions">
            <slot name="actions" />
        </div>
    </header>
</template>
