<script setup lang="ts">
import type { Component } from 'vue';
import type { XiaobaiOsAppDefinition } from '../app-registry.js';
import type { XiaobaiOsFrameBridge } from '../frame-bridge.js';
import XiaobaiOsHome from './XiaobaiOsHome.vue';
import XiaobaiOsNavigation from './XiaobaiOsNavigation.vue';
import XiaobaiOsSystemBar from './XiaobaiOsSystemBar.vue';

defineProps<{
    apps: readonly XiaobaiOsAppDefinition[];
    activeComponent: Component | null;
    activeState: unknown;
    bridge: XiaobaiOsFrameBridge;
    characterAvatar: string;
    isHome: boolean;
}>();

defineEmits<{
    openApp: [app: XiaobaiOsAppDefinition];
    back: [];
    home: [];
    close: [];
}>();
</script>

<template>
    <div class="xiaobai-os-device">
        <span class="xiaobai-os-side-key" aria-hidden="true" />
        <div class="xiaobai-os-glass">
            <XiaobaiOsSystemBar :is-home="isHome" />
            <div class="xiaobai-os-stage">
                <Transition name="xiaobai-os-route" mode="out-in">
                    <XiaobaiOsHome
                        v-if="isHome"
                        key="home"
                        :apps="apps"
                        :character-avatar="characterAvatar"
                        @open-app="$emit('openApp', $event)"
                    />
                    <component
                        :is="activeComponent"
                        v-else-if="activeComponent"
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
