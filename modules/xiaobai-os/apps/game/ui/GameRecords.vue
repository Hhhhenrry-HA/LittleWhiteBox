<script setup lang="ts">
import type { GameLadderChoice, GameRecordView } from '../types.js';

defineProps<{
    records: GameRecordView[];
    total: number;
    hasMore: boolean;
    loadingMore: boolean;
    error: string;
}>();

defineEmits<{
    loadMore: [];
}>();

const CHOICE_LABELS: Readonly<Record<GameLadderChoice, string>> = Object.freeze({
    safe: '稳',
    medium: '中',
    risky: '险',
});

function formatTime(value: number): string {
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}
</script>

<template>
    <section class="game-records" aria-labelledby="game-records-title">
        <header class="game-section-heading">
            <div><span>HOUSE LEDGER</span><h2 id="game-records-title">牌桌记录</h2></div>
            <small>{{ total }} 局</small>
        </header>

        <div v-if="records.length" class="game-record-list">
            <article v-for="record in records" :key="record.id" class="game-record" :class="`is-${record.outcomeTone}`">
                <div class="game-record-mark" aria-hidden="true">{{ record.game === 'dice' ? '骰' : record.game === 'push' ? '翻' : '阶' }}</div>
                <div class="game-record-main">
                    <header>
                        <div><span>{{ record.gameLabel }}</span><strong>{{ record.outcomeLabel }}</strong></div>
                        <time :datetime="new Date(record.createdAt).toISOString()">{{ formatTime(record.createdAt) }}</time>
                    </header>
                    <div class="game-record-money">
                        <span>下注 ¤ {{ record.amountIn }}</span>
                        <span>返还 ¤ {{ record.payout }}</span>
                        <strong>{{ record.net > 0 ? '+' : '' }}{{ record.net }}</strong>
                    </div>
                    <details>
                        <summary>查看公开牌局</summary>
                        <div v-if="record.detail.kind === 'dice'" class="game-record-detail">
                            <p>终局叫数：{{ record.detail.finalBid.count }} 枚 {{ record.detail.finalBid.face }} 点</p>
                            <p>实际匹配：{{ record.detail.matchingDiceCount }} 枚 · {{ record.detail.challenger === 'player' ? '玩家' : '庄家' }}开骰</p>
                            <p>你的骰子：{{ record.detail.playerDice.join(' · ') }}</p>
                        </div>
                        <div v-else-if="record.detail.kind === 'push'" class="game-record-detail">
                            <p>共翻出 {{ record.detail.revealedCoins }} 枚金币</p>
                        </div>
                        <ol v-else class="game-record-steps">
                            <li v-for="step in record.detail.steps" :key="step.floor">
                                第 {{ step.floor }} 层 · {{ CHOICE_LABELS[step.choice] }} ·
                                {{ step.success ? `成功至 ¤ ${step.amountAfterStep}` : '挑战失败' }}
                            </li>
                        </ol>
                    </details>
                </div>
            </article>
        </div>
        <div v-else class="game-record-empty"><span aria-hidden="true">◇</span><p>尚无结算记录</p></div>

        <p v-if="error" class="game-inline-error" role="status">{{ error }}</p>
        <button v-if="hasMore" type="button" class="game-load-more" :disabled="loadingMore" @click="$emit('loadMore')">
            {{ loadingMore ? '正在翻阅…' : '继续翻阅记录' }}
        </button>
    </section>
</template>
