<script setup lang="ts">
defineProps<{
    isHome: boolean;
}>();
</script>

<template>
    <header class="xiaobai-os-system-bar" :class="{ 'is-home': isHome }" aria-label="系统状态">
        <span class="xiaobai-os-system-mark">小白</span>
        <span class="xiaobai-os-system-status" aria-hidden="true">
            <span class="xiaobai-os-signal"><i /><i /><i /><i /></span>
            <span class="xiaobai-os-battery"><i /></span>
        </span>
    </header>
</template>
