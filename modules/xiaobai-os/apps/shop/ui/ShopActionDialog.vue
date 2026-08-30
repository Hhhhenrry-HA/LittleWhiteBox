<script setup lang="ts">
import { computed, reactive } from 'vue';
import type { ShopActivationView, ShopCatalogItemView } from '../types.js';

const props = defineProps<{
    mode: 'purchase' | 'use' | 'deactivate';
    item: ShopCatalogItemView;
    activation?: ShopActivationView;
    busy: boolean;
    error: string;
}>();

const emit = defineEmits<{
    cancel: [];
    confirm: [parameters: Record<string, string>];
}>();

const parameters = reactive<Record<string, string>>({});
const title = computed(() => {
    if (props.mode === 'purchase') {return '确认购入';}
    if (props.mode === 'deactivate') {return '关闭效果';}
    return '确认使用';
});
const confirmation = computed(() => {
    if (props.mode === 'purchase') {return `将支付 ${props.item.price} 小白币，奇物会先放入背包。`;}
    if (props.mode === 'deactivate') {return '关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。';}
    if (props.item.duration === 'permanent') {return '这件奇物将永久影响后续剧情，使用后无法关闭。';}
    return `使用后从下一次回复起${props.item.durationLabel}。`;
});
const formValid = computed(() => props.mode !== 'use' || props.item.inputs.every(input => (
    String(parameters[input.key] || '').trim().length > 0
)));

function submit(): void {
    if (!props.busy && formValid.value) {emit('confirm', { ...parameters });}
}
</script>

<template>
    <dialog
        open
        class="shop-dialog"
        :aria-labelledby="`shop-dialog-${mode}`"
        @click.self="!busy && $emit('cancel')"
        @keydown.esc.stop.prevent="!busy && $emit('cancel')"
    >
        <form method="dialog" class="shop-dialog-card" @submit.prevent="submit">
            <span class="shop-dialog-kicker">SEALED DECISION</span>
            <h2 :id="`shop-dialog-${mode}`">{{ title }}</h2>
            <div class="shop-dialog-item">
                <span aria-hidden="true">{{ item.name.slice(0, 1) }}</span>
                <div><strong>{{ item.name }}</strong><small>{{ item.durationLabel }}</small></div>
            </div>

            <label v-for="input in mode === 'use' ? item.inputs : []" :key="input.key" class="shop-dialog-field">
                <span>{{ input.label }}</span>
                <input
                    v-model="parameters[input.key]"
                    type="text"
                    :maxlength="input.maxLength"
                    :placeholder="input.placeholder"
                    autocomplete="off"
                    required
                >
            </label>

            <p class="shop-dialog-warning" :class="{ 'is-permanent': mode === 'use' && item.duration === 'permanent' }">
                {{ confirmation }}
            </p>
            <p v-if="error" class="shop-dialog-error" role="alert">{{ error }}</p>
            <div class="shop-dialog-actions">
                <button type="button" :disabled="busy" @click="$emit('cancel')">再想想</button>
                <button type="submit" class="is-primary" :disabled="busy || !formValid">
                    {{ busy ? '正在封存…' : mode === 'purchase' ? '确认支付' : mode === 'deactivate' ? '确认关闭' : '确认使用' }}
                </button>
            </div>
        </form>
    </dialog>
</template>
