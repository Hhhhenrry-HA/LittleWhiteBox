<script setup lang="ts">
import { computed } from 'vue';
import type { WalletStatus } from '../types.js';

const props = defineProps<{
    balance: number;
    currency: string;
    status: WalletStatus;
}>();

const formattedBalance = computed(() => Number(props.balance).toLocaleString('zh-CN'));
const statusLabel = computed(() => ({
    ready: '账目已核',
    reconciling: '剧情核对中',
    saving: '保存确认中',
    unconfirmed: '保存待核实',
    conflict: '账目已冻结',
    blocked: '账目已暂停',
})[props.status]);
</script>

<template>
    <section class="wallet-balance-card" aria-labelledby="wallet-balance-title">
        <div class="wallet-balance-watermark" aria-hidden="true">白</div>
        <header>
            <span class="wallet-seal" aria-hidden="true">币</span>
            <div>
                <p id="wallet-balance-title">当前结余</p>
                <small>{{ currency }} · 私人账簿</small>
            </div>
        </header>
        <div class="wallet-balance-value" :aria-label="`${formattedBalance} ${currency}`">
            <span>¤</span>{{ formattedBalance }}
        </div>
        <footer>
            <span>NO. XBO-01</span>
            <span class="wallet-balance-state"><i :class="`is-${status}`" />{{ statusLabel }}</span>
        </footer>
    </section>
</template>
