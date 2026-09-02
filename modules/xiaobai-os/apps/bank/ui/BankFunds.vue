<script setup lang="ts">
import type { BankFundProductView } from '../types.js';

defineProps<{
    products: BankFundProductView[];
    balance: number;
    writeDisabledReason: string;
}>();

defineEmits<{
    open: [product: BankFundProductView];
}>();
</script>

<template>
    <section aria-labelledby="bank-funds-title">
        <header class="bank-section-heading">
            <h2 id="bank-funds-title">浮动理财</h2>
            <small>到期前不揭晓结果</small>
        </header>
        <p class="bank-section-intro">收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。</p>
        <div class="bank-product-grid">
            <article v-for="(product, index) in products" :key="product.id" class="bank-product-card bank-fund-card">
                <header>
                    <span class="bank-product-index">F{{ index + 1 }}</span>
                    <div><small>{{ product.lockLabel }}</small><h3>{{ product.name }}</h3></div>
                    <span class="bank-risk-badge" :class="`is-${product.riskLevel}`">{{ product.riskLabel }}</span>
                </header>
                <p>{{ product.description }}</p>
                <div class="bank-rate-block">
                    <span>合同收益区间</span><strong>{{ product.returnLabel }}</strong><small>实际结果到期可见</small>
                </div>
                <dl class="bank-product-terms"><div><dt>开户范围</dt><dd>{{ product.amountLabel }}</dd></div></dl>
                <button
                    type="button"
                    :disabled="Boolean(writeDisabledReason) || balance < product.minAmount"
                    :title="writeDisabledReason || (balance < product.minAmount ? '可用余额不足最低开户额' : '')"
                    @click="$emit('open', product)"
                >
                    申购理财<span>›</span>
                </button>
            </article>
        </div>
    </section>
</template>
