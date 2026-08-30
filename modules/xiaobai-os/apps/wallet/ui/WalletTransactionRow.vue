<script setup lang="ts">
import { computed } from 'vue';
import type { WalletTransactionView } from '../types.js';

const MARK_PATHS: Readonly<Record<string, string>> = {
    income: 'M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5',
    expense: 'M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5',
    transfer: 'M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4',
};

const props = defineProps<{ transaction: WalletTransactionView }>();

const markPath = computed(() => MARK_PATHS[props.transaction.direction] || MARK_PATHS.transfer);

const formattedAmount = computed(() => {
    const amount = props.transaction.amount.toLocaleString('zh-CN');
    if (props.transaction.direction === 'income') {return `+${amount}`;}
    if (props.transaction.direction === 'expense') {return `−${amount}`;}
    return amount;
});

const formattedAnchor = computed(() => {
    const date = new Date(props.transaction.createdAt);
    const time = new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
    return props.transaction.anchorFloor < 0 ? `开户 · ${time}` : `第 ${props.transaction.anchorFloor} 楼 · ${time}`;
});
</script>

<template>
    <li class="wallet-row" :class="`is-${transaction.direction}`">
        <span class="wallet-row-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path :d="markPath" /></svg>
        </span>
        <div class="wallet-row-copy">
            <strong>{{ transaction.title }}</strong>
            <p v-if="transaction.note">{{ transaction.note }}</p>
            <small>{{ transaction.source }} · {{ formattedAnchor }}</small>
        </div>
        <span class="wallet-row-amount">{{ formattedAmount }}</span>
    </li>
</template>
