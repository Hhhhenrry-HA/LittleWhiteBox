<script setup lang="ts">
import type { BankDepositPositionView, BankFundPositionView } from '../types.js';

defineProps<{
    deposits: BankDepositPositionView[];
    investments: BankFundPositionView[];
    claimableCount: number;
    writeDisabledReason: string;
}>();

defineEmits<{
    withdraw: [position: BankDepositPositionView];
    settle: [];
}>();
</script>

<template>
    <section aria-labelledby="bank-positions-title">
        <header class="bank-section-heading">
            <div><span>SEALED POSITIONS</span><h2 id="bank-positions-title">我的头寸</h2></div>
            <button
                v-if="claimableCount"
                type="button"
                class="bank-small-claim"
                :disabled="Boolean(writeDisabledReason)"
                @click="$emit('settle')"
            >
                领取全部 {{ claimableCount }} 笔
            </button>
        </header>

        <div v-if="!deposits.length && !investments.length" class="bank-empty-state">
            <span>◇</span><strong>金库尚无头寸</strong><p>从定期或理财页面选择一份产品开始配置资产。</p>
        </div>

        <div v-if="deposits.length" class="bank-position-group">
            <header><h3>定期存单</h3><span>{{ deposits.length }}</span></header>
            <article v-for="position in deposits" :key="position.id" class="bank-position-card">
                <div class="bank-position-top">
                    <span class="bank-position-mark">定</span>
                    <div><h4>{{ position.name }}</h4><small>本金 ¤ {{ position.principal.toLocaleString('zh-CN') }}</small></div>
                    <span class="bank-position-status" :class="{ 'is-due': position.claimable }">{{ position.statusLabel }}</span>
                </div>
                <dl>
                    <div><dt>到期兑付</dt><dd>¤ {{ position.maturityAmount.toLocaleString('zh-CN') }}</dd></div>
                    <div v-if="!position.claimable"><dt>现在支取</dt><dd class="is-loss">¤ {{ position.earlyWithdrawalAmount.toLocaleString('zh-CN') }}</dd></div>
                </dl>
                <button
                    v-if="!position.claimable"
                    type="button"
                    class="bank-withdraw-button"
                    :disabled="Boolean(writeDisabledReason)"
                    :title="writeDisabledReason"
                    @click="$emit('withdraw', position)"
                >
                    提前支取
                </button>
                <span v-else class="bank-due-note">将在“领取全部”时统一兑付</span>
            </article>
        </div>

        <div v-if="investments.length" class="bank-position-group">
            <header><h3>浮动理财</h3><span>{{ investments.length }}</span></header>
            <article v-for="position in investments" :key="position.id" class="bank-position-card">
                <div class="bank-position-top">
                    <span class="bank-position-mark">理</span>
                    <div><h4>{{ position.name }}</h4><small>{{ position.riskLabel }} · 本金 ¤ {{ position.principal.toLocaleString('zh-CN') }}</small></div>
                    <span class="bank-position-status" :class="{ 'is-due': position.claimable }">{{ position.statusLabel }}</span>
                </div>
                <div v-if="position.claimable" class="bank-fund-result">
                    <span>封存结果已揭晓</span><strong :class="{ 'is-negative': position.resolvedReturnBps < 0 }">{{ position.returnLabel }}</strong>
                    <small>可兑付 ¤ {{ position.settlementAmount.toLocaleString('zh-CN') }}</small>
                </div>
                <p v-else class="bank-sealed-copy">收益结果仍在金库中封存，到期前不会公开。</p>
            </article>
        </div>
    </section>
</template>
