<script setup lang="ts">
import type { XiaobaiOsAppDefinition } from '../app-registry.js';

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
                    <svg v-if="app.icon === 'wallet'" viewBox="0 0 64 64">
                        <path d="M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27" />
                        <path d="M54 30H42a6 6 0 0 0 0 12h12M43 36h.1" />
                    </svg>
                    <svg v-else viewBox="0 0 64 64">
                        <path d="M13 15h38v29H32l-12 9 3-9H13z" />
                        <path d="M22 25h20M22 33h14" />
                    </svg>
                </span>
                <span class="xiaobai-os-app-name">{{ app.name }}</span>
            </button>
        </section>
    </main>
</template>
