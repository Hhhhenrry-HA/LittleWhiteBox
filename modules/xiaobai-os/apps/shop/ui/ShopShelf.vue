<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ShopCatalogItemView } from '../types.js';
import ShopIcon from './ShopIcon.vue';
import ShopItemArt from './ShopItemArt.vue';

const props = defineProps<{ catalog: ShopCatalogItemView[] }>();
defineEmits<{ open: [item: ShopCatalogItemView] }>();
const selectedCategory = ref('all');
const query = ref('');
const shelfItems = computed(() => props.catalog.filter(item => item.onShelf));
const categories = computed(() => {
    const found = new Map(shelfItems.value.map(item => [item.category, item.categoryLabel]));
    return [{ id: 'all', label: '全部' }, ...Array.from(found, ([id, label]) => ({ id, label }))];
});
const visibleItems = computed(() => {
    const text = query.value.trim().toLocaleLowerCase('zh-CN');
    return shelfItems.value.filter(item => (selectedCategory.value === 'all' || item.category === selectedCategory.value)
        && (!text || [item.name, item.description, item.categoryLabel].some(value => value.toLocaleLowerCase('zh-CN').includes(text))));
});
function reset(): void {
    query.value = '';
    selectedCategory.value = 'all';
}
</script>
<template>
    <section class="shop-shelf shop-page" aria-labelledby="shop-shelf-title">
        <div class="shop-storefront">
            <div class="shop-storefront-copy"><span class="shop-eyebrow">小白奇物店</span><h2 id="shop-shelf-title">给故事，<br>添一点奇妙。</h2><p>小小一件，藏着不寻常。</p></div>
            <div class="shop-storefront-art" aria-hidden="true"><ShopItemArt name="card_giftcard" /><ShopItemArt name="local_florist" /></div>
            <span class="shop-storefront-seal" aria-hidden="true">奇物<br>陈列室</span>
        </div>
        <label class="shop-search"><ShopIcon name="search" /><input v-model="query" type="search" placeholder="寻找一件奇物" aria-label="搜索商品" autocomplete="off"><button v-if="query" type="button" aria-label="清空搜索" @click="query = ''"><ShopIcon name="close" /></button></label>
        <nav class="shop-categories" aria-label="商品分类">
            <button v-for="category in categories" :key="category.id" type="button" :aria-pressed="selectedCategory === category.id" @click="selectedCategory = category.id">{{ category.label }}</button>
        </nav>
        <header class="shop-section-heading"><h3>{{ query.trim() ? '找到这些奇物' : selectedCategory === 'all' ? '全部奇物' : categories.find(category => category.id === selectedCategory)?.label }}</h3><small>{{ visibleItems.length }} 件</small></header>
        <div v-if="visibleItems.length" class="shop-product-grid">
            <button v-for="item in visibleItems" :key="item.id" type="button" class="shop-product-card" :aria-label="`查看${item.name}`" @click="$emit('open', item)">
                <span class="shop-product-stage" :data-category="item.category">
                    <ShopItemArt :name="item.icon" />
                    <span v-if="item.quantity" class="shop-owned-tag">持有 {{ item.quantity }}</span>
                    <span v-else-if="item.purchaseLimit !== null && item.purchasedCount >= item.purchaseLimit" class="shop-owned-tag">已购满</span>
                </span>
                <span class="shop-product-info"><small>{{ item.categoryLabel }}</small><strong>{{ item.name }}</strong><span class="shop-product-duration">{{ item.durationLabel }}</span><span class="shop-product-price"><b><i>¤</i> {{ item.price.toLocaleString('zh-CN') }}</b><span class="shop-product-arrow"><ShopIcon name="next" /></span></span></span>
            </button>
        </div>
        <div v-else class="shop-empty"><span><ShopIcon name="search" /></span><h3>{{ shelfItems.length ? '还没找到这件奇物' : '货架暂时没有商品' }}</h3><p>{{ shelfItems.length ? '试试其他名称、效果或分类。' : '已拥有的奇物仍然留在背包里。' }}</p><button v-if="shelfItems.length" type="button" class="shop-secondary-button" @click="reset">看看全部奇物</button></div>
        <p class="shop-footnote">用小白币购入，先放进背包。<br>想好再使用，故事由你继续。</p>
    </section>
</template>
