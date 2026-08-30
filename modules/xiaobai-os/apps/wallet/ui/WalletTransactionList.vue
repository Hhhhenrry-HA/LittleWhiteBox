<script setup lang="ts">
import type { WalletTransactionView } from '../types.js';
import WalletEmpty from './WalletEmpty.vue';
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
    <div>
        <WalletEmpty
            v-if="transactions.length === 1 && transactions[0]?.anchorFloor === -1"
            title="新账簿已经启用"
            message="除了开户赠礼，还没有其他收支。"
        >
            <template #icon>
                <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
            </template>
        </WalletEmpty>
        <ol v-else class="wallet-ui-list">
            <WalletTransactionRow
                v-for="transaction in transactions"
                :key="transaction.id"
                :transaction="transaction"
            />
        </ol>
        <div v-if="hasMore || transactions.length > 1" class="wallet-ledger-foot">
            <p v-if="error" class="wallet-load-error" role="alert">{{ error }}</p>
            <button
                v-if="hasMore"
                type="button"
                class="wallet-ui-text-button"
                :disabled="loadingMore"
                @click="$emit('loadMore')"
            >
                {{ loadingMore ? '正在翻阅…' : '翻阅更早账目' }}
            </button>
            <span v-else class="wallet-ledger-end">账簿至此</span>
        </div>
    </div>
</template>
