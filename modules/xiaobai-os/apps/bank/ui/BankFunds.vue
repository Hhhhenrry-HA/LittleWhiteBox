<script setup lang="ts">
import type { BankFundProductView } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';
defineProps<{ products: BankFundProductView[]; balance: number; writeDisabledReason: string }>();
defineEmits<{ open: [product: BankFundProductView] }>();
</script>
<template>
    <section class="bank-page" aria-labelledby="bank-funds-title">
        <header class="bank-page-heading"><span class="bank-eyebrow">留一点空间，给未知的回报</span><h2 id="bank-funds-title">浮动理财</h2><p>有机会获得收益，也可能损失本金。</p></header>
        <p v-if="writeDisabledReason" class="bank-hint" role="status">{{ writeDisabledReason }}</p>
        <div class="bank-product-grid">
            <article v-for="product in products" :key="product.id" class="bank-product-card bank-fund-card" :data-risk="product.riskLevel">
                <header><span class="bank-product-mark"><BankProductIcon kind="fund" /></span><h3>{{ product.name }}</h3><span class="bank-risk-badge" :class="`is-${product.riskLevel}`">{{ product.riskLabel }}</span></header>
                <p class="bank-fund-description">{{ product.description }}</p>
                <div class="bank-return-range"><span>整期收益区间 · 非年化</span><strong>{{ product.returnLabel }}</strong><small>锁定 {{ product.lockRounds }} 回合</small></div>
                <dl class="bank-product-terms"><div><dt>申购范围</dt><dd>{{ product.amountLabel }}</dd></div><div><dt>退出规则</dt><dd>到期前不可退出</dd></div></dl>
                <button type="button" class="bank-secondary-button bank-full-button" :disabled="Boolean(writeDisabledReason) || balance < product.minAmount" @click="$emit('open', product)">申购这份理财<BankProductIcon kind="next" /></button>
                <p v-if="balance < product.minAmount" class="bank-product-hint">钱包余额不足最低申购金额</p>
            </article>
        </div>
        <p class="bank-footnote">收益结果在申购时封存，到期才揭晓。<br>展示的是合同区间，不是预估收益。</p>
    </section>
</template>
