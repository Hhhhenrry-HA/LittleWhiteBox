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
    <section class="wallet-balance wallet-ui-rise" aria-labelledby="wallet-balance-title">
        <header>
            <p id="wallet-balance-title">当前结余</p>
            <span class="wallet-balance-chip">
                <i :class="`is-${status}`" aria-hidden="true" />{{ statusLabel }}
            </span>
        </header>
        <div class="wallet-balance-value" :aria-label="`${formattedBalance} ${currency}`">
            <span aria-hidden="true">¤</span>{{ formattedBalance }}
        </div>
        <footer>{{ currency }}</footer>
    </section>
</template>
