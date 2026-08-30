<script setup lang="ts">
import type { WalletTransactionView } from '../types.js';
import WalletTransactionRow from './WalletTransactionRow.vue';

defineProps<{
    transactions: readonly WalletTransactionView[];
    hasMore: boolean;
    loadingMore: boolean;
    error: string;
}>();

defineEmits<{ loadMore: [] }>();
</script>

<template>
    <div class="wallet-ledger-body">
        <div v-if="transactions.length === 1 && transactions[0]?.anchorFloor === -1" class="wallet-ledger-empty">
            <span aria-hidden="true">✓</span>
            <strong>新账簿已经启用</strong>
            <p>除了开户赠礼，还没有其他收支。</p>
        </div>
        <ol v-else class="wallet-transaction-list">
            <WalletTransactionRow
                v-for="transaction in transactions"
                :key="transaction.id"
                :transaction="transaction"
            />
        </ol>
        <p v-if="error" class="wallet-load-error" role="alert">{{ error }}</p>
        <button
            v-if="hasMore"
            type="button"
            class="wallet-load-more"
            :disabled="loadingMore"
            @click="$emit('loadMore')"
        >
            {{ loadingMore ? '正在翻阅…' : '翻阅更早账目' }}
        </button>
        <div v-else-if="transactions.length > 1" class="wallet-ledger-end">— 账簿至此 —</div>
    </div>
</template>
