<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <header class="wallet-ui-header">
        <div class="wallet-ui-header-copy">
            <h1 class="wallet-ui-title">{{ title }}</h1>
        </div>
    </header>
</template>
