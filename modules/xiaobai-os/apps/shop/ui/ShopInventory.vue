<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ShopActivationView, ShopCatalogItemView } from '../types.js';

const props = defineProps<{
    catalog: ShopCatalogItemView[];
    activations: ShopActivationView[];
    writeDisabledReason: string;
}>();

defineEmits<{
    use: [item: ShopCatalogItemView];
    deactivate: [activation: ShopActivationView];
}>();

const exhaustedOpen = ref(false);
const active = computed(() => props.activations.filter(activation => activation.state === 'active'));
const held = computed(() => props.catalog.filter(item => item.quantity > 0));
const exhausted = computed(() => props.catalog.filter(item => item.purchasedCount > 0 && item.quantity === 0));
const historyByItem = computed(() => {
    const counts = new Map<string, number>();
    for (const activation of props.activations) {
        if (activation.state !== 'active') {counts.set(activation.itemId, (counts.get(activation.itemId) || 0) + 1);}
    }
    return counts;
});
</script>

<template>
    <section class="shop-inventory" aria-labelledby="shop-inventory-title">
        <header class="shop-section-heading">
            <div>
                <span>PRIVATE COLLECTION</span>
                <h2 id="shop-inventory-title">我的奇物</h2>
            </div>
            <small>{{ held.reduce((total, item) => total + item.quantity, 0) }} 件可用</small>
        </header>
        <p v-if="writeDisabledReason" class="shop-write-reason" role="status">{{ writeDisabledReason }}</p>

        <section class="shop-inventory-group" aria-labelledby="shop-active-title">
            <header><h3 id="shop-active-title">生效中</h3><span>{{ active.length }}</span></header>
            <div v-if="active.length" class="shop-activation-list">
                <article v-for="activation in active" :key="activation.activationId" class="shop-activation-card">
                    <div class="shop-mini-mark" aria-hidden="true">{{ activation.name.slice(0, 1) }}</div>
                    <div>
                        <h4>{{ activation.name }}</h4>
                        <p v-for="parameter in activation.parameters" :key="parameter.label">
                            <span>{{ parameter.label }}</span>{{ parameter.value }}
                        </p>
                        <small>{{ activation.stateLabel }}</small>
                    </div>
                    <button
                        v-if="activation.canDeactivate"
                        type="button"
                        :disabled="Boolean(writeDisabledReason)"
                        :title="writeDisabledReason"
                        @click="$emit('deactivate', activation)"
                    >
                        关闭
                    </button>
                </article>
            </div>
            <p v-else class="shop-empty-copy">尚无正在影响剧情的奇物。</p>
        </section>

        <section class="shop-inventory-group" aria-labelledby="shop-held-title">
            <header><h3 id="shop-held-title">持有</h3><span>{{ held.length }}</span></header>
            <div v-if="held.length" class="shop-held-grid">
                <article v-for="item in held" :key="item.id" class="shop-held-card">
                    <div class="shop-mini-mark" aria-hidden="true">{{ item.name.slice(0, 1) }}</div>
                    <div>
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.durationLabel }}</p>
                    </div>
                    <strong>×{{ item.quantity }}</strong>
                    <button
                        type="button"
                        :disabled="Boolean(writeDisabledReason)"
                        :title="writeDisabledReason"
                        @click="$emit('use', item)"
                    >
                        使用
                    </button>
                </article>
            </div>
            <p v-else class="shop-empty-copy">背包还是空的，去货架挑一件吧。</p>
        </section>

        <section v-if="exhausted.length" class="shop-inventory-group is-exhausted">
            <button
                type="button"
                class="shop-collapse-button"
                :aria-expanded="exhaustedOpen"
                @click="exhaustedOpen = !exhaustedOpen"
            >
                <span>已耗尽</span><small>{{ exhausted.length }}</small><i aria-hidden="true">⌄</i>
            </button>
            <div v-if="exhaustedOpen" class="shop-exhausted-list">
                <article v-for="item in exhausted" :key="item.id">
                    <span>{{ item.name }}</span>
                    <small>购入 {{ item.purchasedCount }} 次<span v-if="historyByItem.get(item.id)"> · 已结束 {{ historyByItem.get(item.id) }}</span></small>
                </article>
            </div>
        </section>
    </section>
</template>
