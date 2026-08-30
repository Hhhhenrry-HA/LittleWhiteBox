<script setup lang="ts">
import { computed } from 'vue';
import type { WalletTransactionView } from '../types.js';

const props = defineProps<{ transaction: WalletTransactionView }>();

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
    <li class="wallet-transaction-row" :class="`is-${transaction.direction}`">
        <span class="wallet-transaction-mark" aria-hidden="true">
            {{ transaction.direction === 'income' ? '入' : transaction.direction === 'expense' ? '出' : '转' }}
        </span>
        <div class="wallet-transaction-copy">
            <strong>{{ transaction.title }}</strong>
            <p v-if="transaction.note">{{ transaction.note }}</p>
            <small>{{ transaction.source }} · {{ formattedAnchor }}</small>
        </div>
        <span class="wallet-transaction-amount">{{ formattedAmount }}</span>
    </li>
</template>
