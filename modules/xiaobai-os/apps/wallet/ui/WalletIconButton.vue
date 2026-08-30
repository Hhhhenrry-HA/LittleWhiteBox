<script setup lang="ts">
defineProps<{
    label: string;
    disabled?: boolean;
    busy?: boolean;
}>();

defineEmits<{
    activate: [];
}>();
</script>

<template>
    <button
        type="button"
        class="wallet-ui-icon-button"
        :class="{ 'is-busy': busy }"
        :title="label"
        :aria-label="label"
        :disabled="disabled"
        @click="$emit('activate')"
    >
        <slot />
    </button>
</template>
