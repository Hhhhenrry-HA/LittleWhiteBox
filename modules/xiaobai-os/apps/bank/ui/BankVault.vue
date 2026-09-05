<script setup lang="ts">
import type { BankPage } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';
defineProps<{ balance: number; lockedAmount: number; currentTurn: number; depositCount: number; fundCount: number; claimableCount: number; writeDisabledReason: string }>();
defineEmits<{ navigate: [page: BankPage]; settle: [] }>();
</script>
<template>
    <section class="bank-vault bank-page" aria-labelledby="bank-vault-title">
        <header class="bank-page-heading"><span class="bank-eyebrow">白银金库 · 当前聊天</span><h2 id="bank-vault-title">让积蓄，有处安放。</h2></header>
        <div class="bank-safe">
            <div class="bank-safe-art" aria-hidden="true"><span class="bank-safe-hinge" /><span class="bank-safe-dial"><i /><i /><i /><b /></span></div>
            <div class="bank-safe-copy"><span>存入银行的本金</span><strong><small>¤</small> {{ lockedAmount.toLocaleString('zh-CN') }}</strong><p>{{ depositCount + fundCount }} 笔持有 · 不含未结算收益</p></div>
            <footer><span>钱包可用 <b>¤ {{ balance.toLocaleString('zh-CN') }}</b></span><span>第 {{ currentTurn }} 回合</span></footer>
        </div>
        <button v-if="claimableCount" type="button" class="bank-claim-button" :disabled="Boolean(writeDisabledReason)" @click="$emit('settle')">
            <span class="bank-claim-icon"><BankProductIcon kind="check" /></span><span><strong>{{ claimableCount }} 笔资产已到期</strong><small>点击全部领取，兑付至钱包</small></span><BankProductIcon kind="next" />
        </button>
        <button v-else type="button" class="bank-holding-link" @click="$emit('navigate', 'positions')"><BankProductIcon kind="positions" /><span>查看我的持有</span><small>{{ depositCount + fundCount }} 笔</small><BankProductIcon kind="next" /></button>
        <p v-if="writeDisabledReason" class="bank-hint" role="status">{{ writeDisabledReason }}</p>
        <header class="bank-section-heading"><h3>为积蓄选个去处</h3></header>
        <div class="bank-vault-portals">
            <button type="button" class="bank-portal" @click="$emit('navigate', 'deposits')"><span class="bank-portal-mark"><BankProductIcon kind="deposit" /></span><strong>定期存单</strong><p>约定期限<br>到期收益确定</p><span class="bank-portal-link">去存一笔<BankProductIcon kind="next" /></span></button>
            <button type="button" class="bank-portal is-fund" @click="$emit('navigate', 'funds')"><span class="bank-portal-mark"><BankProductIcon kind="fund" /></span><strong>浮动理财</strong><p>承担波动<br>到期揭晓盈亏</p><span class="bank-portal-link">了解产品<BankProductIcon kind="next" /></span></button>
        </div>
        <p class="bank-footnote">每完成一条 Assistant 回复，推进一个回合。<br>到期资产可手动领取，也会随下一次银行交易一并结算。</p>
    </section>
</template>
