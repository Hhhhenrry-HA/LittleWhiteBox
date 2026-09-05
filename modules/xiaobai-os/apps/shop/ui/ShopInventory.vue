<script setup lang="ts">
import { computed } from 'vue';
import type { ShopCatalogItemView } from '../types.js';
import ShopIcon from './ShopIcon.vue';
import ShopItemArt from './ShopItemArt.vue';
const props = defineProps<{ catalog: ShopCatalogItemView[]; writeDisabledReason: string }>();
defineEmits<{ open: [item: ShopCatalogItemView]; use: [item: ShopCatalogItemView]; browse: [] }>();
const held = computed(() => props.catalog.filter(item => item.quantity > 0));
const exhausted = computed(() => props.catalog.filter(item => item.purchasedCount > 0 && item.quantity === 0));
const quantity = computed(() => held.value.reduce((total, item) => total + item.quantity, 0));
</script>
<template>
    <section class="shop-page" aria-labelledby="shop-inventory-title">
        <header class="shop-page-heading"><span class="shop-eyebrow">已经属于你的奇妙</span><h2 id="shop-inventory-title">我的背包 <small>{{ quantity }} 件</small></h2><p>买下的奇物留在这里。使用一件，才开始影响故事。</p></header>
        <p v-if="writeDisabledReason" class="shop-hint" role="status">{{ writeDisabledReason }}</p>
        <div v-if="held.length" class="shop-held-list">
            <article v-for="item in held" :key="item.id" class="shop-held-card">
                <button type="button" class="shop-held-open" :aria-label="`查看${item.name}`" @click="$emit('open', item)">
                    <span class="shop-held-art" :data-category="item.category"><ShopItemArt :name="item.icon" /></span>
                    <span><small>{{ item.categoryLabel }}</small><strong>{{ item.name }}</strong><span>{{ item.durationLabel }}</span></span>
                    <b>×{{ item.quantity }}</b>
                </button>
                <footer><span>{{ item.duration === 'permanent' ? '永久效果 · 使用前请确认' : item.duration === 'manual' ? '启用后可手动关闭' : '未使用，不会消耗次数' }}</span><button type="button" class="shop-text-button" :disabled="Boolean(writeDisabledReason)" :aria-label="`使用${item.name}`" @click="$emit('use', item)">使用<ShopIcon name="next" /></button></footer>
            </article>
        </div>
        <div v-else class="shop-empty"><span><ShopIcon name="bag" /></span><h3>背包里，还空着一个位置</h3><p>去逛逛，挑一件想带进故事的奇物。</p><button type="button" class="shop-primary-button" @click="$emit('browse')">去逛店<ShopIcon name="next" /></button></div>
        <details v-if="exhausted.length" class="shop-exhausted">
            <summary>用过的奇物 <small>{{ exhausted.length }} 种</small><ShopIcon name="next" /></summary>
            <div v-for="item in exhausted" :key="item.id"><button type="button" @click="$emit('open', item)">{{ item.name }}</button><span>曾购入 {{ item.purchasedCount }} 件 · 库存 0</span></div>
            <p>库存用完不代表效果结束，启用状态请看「生效中」。</p>
        </details>
    </section>
</template>
