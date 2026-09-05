<script setup lang="ts">
import type { BankDepositProductView } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';
defineProps<{ products: BankDepositProductView[]; balance: number; writeDisabledReason: string }>();
defineEmits<{ open: [product: BankDepositProductView] }>();
</script>
<template>
    <section class="bank-page" aria-labelledby="bank-deposits-title">
        <header class="bank-page-heading"><span class="bank-eyebrow">一份约定，一份确定</span><h2 id="bank-deposits-title">定期存单</h2><p>按故事回合计期，到期后领取本金与收益。</p></header>
        <p v-if="writeDisabledReason" class="bank-hint" role="status">{{ writeDisabledReason }}</p>
        <div class="bank-product-grid">
            <article v-for="product in products" :key="product.id" class="bank-product-card bank-deposit-card">
                <header><span class="bank-product-mark"><BankProductIcon kind="deposit" /></span><h3>{{ product.name }}</h3><span class="bank-term-pill">{{ product.lockRounds }} 回合</span></header>
                <div class="bank-deposit-rate"><div><span>整期收益率 · 非年化</span><strong>{{ product.interestLabel }}</strong></div><span class="bank-contract-stamp" aria-hidden="true">固定<br>收益</span></div>
                <dl class="bank-product-terms"><div><dt>存入范围</dt><dd>{{ product.amountLabel }}</dd></div><div><dt>提前支取</dt><dd>本金 {{ product.earlyPenaltyLabel }}，无利息</dd></div></dl>
                <button type="button" class="bank-primary-button bank-full-button" :disabled="Boolean(writeDisabledReason) || balance < product.minAmount" @click="$emit('open', product)">存入这份存单<BankProductIcon kind="next" /></button>
                <p v-if="balance < product.minAmount" class="bank-product-hint">钱包余额不足最低存入金额</p>
            </article>
        </div>
        <p class="bank-footnote">每完成一条 Assistant 回复，推进一个回合。<br>提前支取有损失，确认前会列明实际到账金额。</p>
    </section>
</template>
