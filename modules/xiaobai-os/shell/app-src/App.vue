<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { xiaobaiOsApps, type XiaobaiOsAppDefinition } from './app-registry.js';
import XiaobaiOsDevice from './components/XiaobaiOsDevice.vue';
import { createFrameBridge, type FrameMessage } from './frame-bridge.js';

interface HostAppDescriptor {
    id: string;
}

interface InitPayload {
    theme?: 'light' | 'dark';
    apps?: HostAppDescriptor[];
    chat?: {
        characterAvatar?: string;
    } | null;
}

const bridge = createFrameBridge();
const root = ref<HTMLElement | null>(null);
const initialized = ref(false);
const theme = ref<'light' | 'dark'>('light');
const availableIds = ref<Set<string>>(new Set());
const characterAvatar = ref('');
const activeApp = ref<XiaobaiOsAppDefinition | null>(null);
const activeState = ref<unknown>(null);
const errorMessage = ref('');
let previousFocus: HTMLElement | null = null;
let unsubscribe = () => {};

const availableApps = computed(() => xiaobaiOsApps.filter(app => availableIds.value.has(app.id)));
const isHome = computed(() => activeApp.value === null);

function applyInit(payload: InitPayload): void {
    theme.value = payload.theme === 'dark' ? 'dark' : 'light';
    availableIds.value = new Set((payload.apps || []).map(app => String(app.id)));
    characterAvatar.value = String(payload.chat?.characterAvatar || '');
    activeApp.value = null;
    activeState.value = null;
    initialized.value = true;
}

function handleHostMessage(message: FrameMessage): void {
    if (message.type === 'os/init') {
        applyInit((message.payload || {}) as InitPayload);
    }
    if (message.type === 'os/theme-changed') {
        const payload = message.payload as { theme?: string };
        theme.value = payload?.theme === 'dark' ? 'dark' : 'light';
    }
    if (message.type === 'os/error') {
        errorMessage.value = String((message.payload as { message?: string })?.message || '小白 OS 初始化失败');
    }
}

async function openApp(app: XiaobaiOsAppDefinition): Promise<void> {
    errorMessage.value = '';
    try {
        const response = await bridge.request('app/activate', { appId: app.id }) as { appId?: string; state?: unknown };
        if (response.appId !== app.id) {
            throw new Error('app_activation_mismatch');
        }
        activeState.value = response.state ?? null;
        activeApp.value = app;
    } catch (error) {
        activeApp.value = null;
        errorMessage.value = error instanceof Error ? error.message : String(error);
    }
}

function goHome(): void {
    if (activeApp.value) {
        bridge.post('app/deactivate', { appId: activeApp.value.id });
    }
    activeApp.value = null;
    activeState.value = null;
}

function close(): void {
    bridge.post('os/close');
}

function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        event.preventDefault();
        if (activeApp.value) {
            goHome();
        } else {
            close();
        }
        return;
    }
    if (event.key !== 'Tab' || !root.value) {
        return;
    }
    const focusable = Array.from(root.value.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
    if (focusable.length === 0) {
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

onMounted(async () => {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    unsubscribe = bridge.subscribe(handleHostMessage);
    bridge.start();
    await nextTick();
    root.value?.focus();
});

onBeforeUnmount(() => {
    unsubscribe();
    bridge.dispose();
    previousFocus?.focus();
});
</script>

<template>
    <main
        ref="root"
        class="xiaobai-os-shell"
        :class="`theme-${theme}`"
        role="dialog"
        aria-modal="true"
        aria-label="小白 OS"
        tabindex="-1"
        @keydown="handleKeydown"
        @click.self="close"
    >
        <div v-if="errorMessage" class="xiaobai-os-error" role="alert">{{ errorMessage }}</div>
        <div v-if="!initialized" class="xiaobai-os-loading" role="status">正在启动小白 OS</div>
        <XiaobaiOsDevice
            v-else
            :apps="availableApps"
            :active-component="activeApp?.component || null"
            :active-state="activeState"
            :bridge="bridge"
            :character-avatar="characterAvatar"
            :is-home="isHome"
            @open-app="openApp"
            @back="goHome"
            @home="goHome"
            @close="close"
        />
    </main>
</template>
