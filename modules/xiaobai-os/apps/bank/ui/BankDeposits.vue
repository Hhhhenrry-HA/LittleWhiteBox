<script setup lang="ts">
import type { BankDepositProductView } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';

defineProps<{
    products: BankDepositProductView[];
    balance: number;
    writeDisabledReason: string;
}>();

defineEmits<{
    open: [product: BankDepositProductView];
}>();
</script>

<template>
    <section aria-labelledby="bank-deposits-title">
        <header class="bank-section-heading">
            <h2 id="bank-deposits-title">定期存单</h2>
            <small>到期收益确定</small>
        </header>
        <p class="bank-section-intro">本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。</p>
        <div class="bank-product-grid">
            <article v-for="(product, index) in products" :key="product.id" class="bank-product-card bank-deposit-card">
                <header>
                    <span class="bank-product-index">0{{ index + 1 }}</span>
                    <div><small>{{ product.lockLabel }}</small><h3>{{ product.name }}</h3></div>
                    <span class="bank-product-seal"><BankProductIcon kind="deposit" /></span>
                </header>
                <div class="bank-rate-block">
                    <span>到期收益率</span><strong>{{ product.interestLabel }}</strong><small>固定收益</small>
                </div>
                <dl class="bank-product-terms">
                    <div><dt>开户范围</dt><dd>{{ product.amountLabel }}</dd></div>
                    <div><dt>提前支取</dt><dd>{{ product.earlyPenaltyLabel }}</dd></div>
                </dl>
                <button
                    type="button"
                    :disabled="Boolean(writeDisabledReason) || balance < product.minAmount"
                    :title="writeDisabledReason || (balance < product.minAmount ? '可用余额不足最低开户额' : '')"
                    @click="$emit('open', product)"
                >
                    开立存单<span>›</span>
                </button>
            </article>
        </div>
    </section>
</template>
