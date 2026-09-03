<script setup lang="ts">
import type { XiaobaiOsAppDefinition } from '../../app-catalog.js';

defineProps<{
    apps: readonly XiaobaiOsAppDefinition[];
    characterAvatar: string;
}>();

defineEmits<{
    openApp: [app: XiaobaiOsAppDefinition];
}>();
</script>

<template>
    <main class="xiaobai-os-home">
        <img v-if="characterAvatar" class="xiaobai-os-wallpaper" :src="characterAvatar" alt="">
        <div class="xiaobai-os-home-wash" aria-hidden="true" />
        <section class="xiaobai-os-app-grid" aria-label="应用">
            <button
                v-for="app in apps"
                :key="app.id"
                type="button"
                class="xiaobai-os-app-tile"
                :style="{ '--app-accent': app.accent }"
                @click="$emit('openApp', app)"
            >
                <span class="xiaobai-os-app-icon" aria-hidden="true">
                    <svg viewBox="0 0 64 64">
                        <path v-for="path in app.iconPaths" :key="path" :d="path" />
                    </svg>
                </span>
                <span class="xiaobai-os-app-name">{{ app.name }}</span>
            </button>
        </section>
    </main>
</template>
