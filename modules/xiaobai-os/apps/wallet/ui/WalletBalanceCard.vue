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
    ready: '账目就绪',
    loading: '正在开户',
    saving: '正在保存',
    unconfirmed: '保存待确认',
    conflict: '账目已冻结',
    blocked: '暂时不可用',
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
