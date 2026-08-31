<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ShopCatalogItemView } from '../types.js';

const props = defineProps<{
    catalog: ShopCatalogItemView[];
    balance: number;
    writeDisabledReason: string;
}>();

defineEmits<{
    purchase: [item: ShopCatalogItemView];
}>();

const selectedCategory = ref('all');
const categories = computed(() => {
    const found = new Map<string, string>();
    for (const item of props.catalog) {found.set(item.category, item.categoryLabel);}
    return [{ id: 'all', label: '全部' }, ...Array.from(found, ([id, label]) => ({ id, label }))];
});
const visibleItems = computed(() => selectedCategory.value === 'all'
    ? props.catalog
    : props.catalog.filter(item => item.category === selectedCategory.value));

function purchaseDisabledReason(item: ShopCatalogItemView): string {
    if (props.writeDisabledReason) {return props.writeDisabledReason;}
    return purchaseHint(item);
}

function purchaseHint(item: ShopCatalogItemView): string {
    if (item.purchaseLimit !== null && item.purchasedCount >= item.purchaseLimit) {return '此奇物已达购买上限';}
    if (props.balance < item.price) {return `还差 ${item.price - props.balance} 小白币`;}
    return '';
}
</script>

<template>
    <section class="shop-shelf" aria-labelledby="shop-shelf-title">
        <header class="shop-section-heading">
            <div>
                <span>CURIO CABINET</span>
                <h2 id="shop-shelf-title">今日陈列</h2>
            </div>
            <small>{{ visibleItems.length }} 件奇物</small>
        </header>

        <nav class="shop-category-strip" aria-label="商品分类">
            <button
                v-for="category in categories"
                :key="category.id"
                type="button"
                :class="{ 'is-active': selectedCategory === category.id }"
                @click="selectedCategory = category.id"
            >
                {{ category.label }}
            </button>
        </nav>

        <div class="shop-product-grid">
            <article v-for="item in visibleItems" :key="item.id" class="shop-product-card">
                <div class="shop-product-mark" aria-hidden="true">{{ item.name.slice(0, 1) }}</div>
                <div class="shop-product-copy">
                    <div class="shop-product-title">
                        <h3>{{ item.name }}</h3>
                        <span>{{ item.categoryLabel }}</span>
                    </div>
                    <p>{{ item.description }}</p>
                    <small>{{ item.durationLabel }}</small>
                    <div class="shop-product-footer">
                        <strong><i>¤</i>{{ item.price }}</strong>
                        <span v-if="item.quantity">持有 {{ item.quantity }}</span>
                        <button
                            type="button"
                            :disabled="Boolean(purchaseDisabledReason(item))"
                            :title="purchaseDisabledReason(item)"
                            @click="$emit('purchase', item)"
                        >
                            {{ item.purchaseLimit !== null && item.purchasedCount >= item.purchaseLimit ? '已购得' : '购入' }}
                        </button>
                    </div>
                    <p v-if="purchaseHint(item)" class="shop-card-reason">{{ purchaseHint(item) }}</p>
                </div>
            </article>
        </div>
    </section>
</template>
