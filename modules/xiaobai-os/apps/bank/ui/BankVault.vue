<script setup lang="ts">
import type { BankPage } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';

defineProps<{
    balance: number;
    lockedAmount: number;
    currentTurn: number;
    depositCount: number;
    fundCount: number;
    claimableCount: number;
    writeDisabledReason: string;
}>();

defineEmits<{
    navigate: [page: BankPage];
    settle: [];
}>();
</script>

<template>
    <section class="bank-vault" aria-labelledby="bank-vault-title">
        <div class="bank-vault-door" aria-hidden="true">
            <div class="bank-vault-ring"><span>III</span><i /><span>VI</span><i /><span>IX</span></div>
        </div>
        <header class="bank-section-heading bank-vault-heading">
            <h2 id="bank-vault-title">金库总览</h2>
            <small>第 {{ currentTurn }} 回合</small>
        </header>

        <div class="bank-balance-panel">
            <span>可用资产</span>
            <strong><small>¤</small>{{ balance.toLocaleString('zh-CN') }}</strong>
            <div><span>小白币活期余额</span><i>随时可用</i></div>
        </div>

        <div class="bank-vault-metrics">
            <article>
                <span>锁定本金</span>
                <strong>¤ {{ lockedAmount.toLocaleString('zh-CN') }}</strong>
                <small>{{ depositCount + fundCount }} 笔持仓</small>
            </article>
            <article :class="{ 'is-claimable': claimableCount > 0 }">
                <span>待领取</span>
                <strong>{{ claimableCount }}</strong>
                <small>{{ claimableCount ? '已到期，可统一兑付' : '暂无到期头寸' }}</small>
            </article>
        </div>

        <button
            v-if="claimableCount"
            type="button"
            class="bank-claim-button"
            :disabled="Boolean(writeDisabledReason)"
            :title="writeDisabledReason"
            @click="$emit('settle')"
        >
            <span>领取全部到期资产</span><small>{{ claimableCount }} 笔一并结算</small>
        </button>

        <div class="bank-vault-portals">
            <button type="button" @click="$emit('navigate', 'deposits')">
                <span class="bank-portal-mark"><BankProductIcon kind="deposit" /></span><strong>定期存单</strong><small>{{ depositCount }} 笔持有</small><i>›</i>
            </button>
            <button type="button" @click="$emit('navigate', 'funds')">
                <span class="bank-portal-mark"><BankProductIcon kind="fund" /></span><strong>浮动理财</strong><small>{{ fundCount }} 笔持有</small><i>›</i>
            </button>
            <button type="button" @click="$emit('navigate', 'records')">
                <span class="bank-portal-mark"><BankProductIcon kind="records" /></span><strong>金融记录</strong><small>查阅历史兑付</small><i>›</i>
            </button>
        </div>
    </section>
</template>
