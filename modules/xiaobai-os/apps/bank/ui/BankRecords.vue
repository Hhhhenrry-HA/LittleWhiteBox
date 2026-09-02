<script setup lang="ts">
import type { BankActivityView } from '../types.js';
import BankProductIcon from './BankProductIcon.vue';

defineProps<{
    activities: BankActivityView[];
    total: number;
    hasMore: boolean;
    loadingMore: boolean;
    error: string;
}>();

defineEmits<{
    loadMore: [];
}>();

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});
</script>

<template>
    <section aria-labelledby="bank-records-title">
        <header class="bank-section-heading">
            <h2 id="bank-records-title">金融记录</h2>
            <small>{{ total }} 笔</small>
        </header>
        <div v-if="!activities.length" class="bank-empty-state">
            <span><BankProductIcon kind="records" /></span><strong>尚无兑付记录</strong><p>头寸到期领取或提前支取后，结果会归档在这里。</p>
        </div>
        <div v-else class="bank-record-list">
            <article v-for="activity in activities" :key="activity.id" class="bank-record-row">
                <span class="bank-record-mark"><BankProductIcon :kind="activity.kind" /></span>
                <div class="bank-record-main">
                    <header><strong>{{ activity.productName }}</strong><span>{{ activity.resultLabel }}</span></header>
                    <dl>
                        <div><dt>投入</dt><dd>¤ {{ activity.amountIn.toLocaleString('zh-CN') }}</dd></div>
                        <div><dt>兑付</dt><dd>¤ {{ activity.payout.toLocaleString('zh-CN') }}</dd></div>
                    </dl>
                    <small>{{ activity.turnLabel }} · {{ dateFormatter.format(activity.createdAt) }}</small>
                </div>
                <strong class="bank-record-net" :class="{ 'is-negative': activity.net < 0, 'is-flat': activity.net === 0 }">
                    {{ activity.net > 0 ? '+' : '' }}{{ activity.net }}
                    <small>{{ activity.netLabel }}</small>
                </strong>
            </article>
            <p v-if="error" class="bank-inline-error" role="alert">{{ error }}</p>
            <button v-if="hasMore" type="button" class="bank-load-more" :disabled="loadingMore" @click="$emit('loadMore')">
                {{ loadingMore ? '正在开启下一册…' : '载入更多记录' }}
            </button>
            <p v-else class="bank-record-end">金库档案已全部展开</p>
        </div>
    </section>
</template>
