<script setup lang="ts">
import { computed } from 'vue';
import type { XiaobaiOsAppDefinition } from '../app-registry.js';
import type { XiaobaiOsFrameBridge } from '../frame-bridge.js';
import XiaobaiOsHome from './XiaobaiOsHome.vue';
import XiaobaiOsNavigation from './XiaobaiOsNavigation.vue';
import XiaobaiOsSystemBar from './XiaobaiOsSystemBar.vue';

const props = defineProps<{
    apps: readonly XiaobaiOsAppDefinition[];
    activeApp: XiaobaiOsAppDefinition | null;
    activeState: unknown;
    bridge: XiaobaiOsFrameBridge;
    characterAvatar: string;
}>();

defineEmits<{
    openApp: [app: XiaobaiOsAppDefinition];
    back: [];
    home: [];
    close: [];
}>();

const isHome = computed(() => props.activeApp === null);
</script>

<template>
    <div class="xiaobai-os-device">
        <span class="xiaobai-os-side-key" aria-hidden="true" />
        <div class="xiaobai-os-glass">
            <XiaobaiOsSystemBar :is-home="isHome" />
            <div class="xiaobai-os-stage" :style="activeApp ? { '--app-accent': activeApp.accent } : null">
                <Transition name="xiaobai-os-route" mode="out-in">
                    <XiaobaiOsHome
                        v-if="isHome"
                        key="home"
                        :apps="apps"
                        :character-avatar="characterAvatar"
                        @open-app="$emit('openApp', $event)"
                    />
                    <component
                        :is="activeApp.component"
                        v-else-if="activeApp"
                        key="app"
                        :bridge="bridge"
                        :initial-state="activeState"
                    />
                </Transition>
            </div>
            <XiaobaiOsNavigation
                :is-home="isHome"
                @back="$emit('back')"
                @home="$emit('home')"
                @close="$emit('close')"
            />
        </div>
    </div>
</template>
