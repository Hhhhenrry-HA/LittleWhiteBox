<script setup lang="ts">
import type { GamePushGameView } from '../types.js';

const props = defineProps<{
    game: GamePushGameView;
    writeDisabledReason: string;
}>();

const emit = defineEmits<{
    draw: [];
    cashOut: [];
    lobby: [];
}>();

function percent(basisPoints: number): string {
    return `${(basisPoints / 100).toFixed(basisPoints % 100 === 0 ? 0 : 2)}%`;
}
</script>

<template>
    <section class="game-table game-push-table" aria-labelledby="game-push-title">
        <header class="game-table-heading">
            <button type="button" class="game-back" @click="emit('lobby')">返回大厅</button>
            <div><span>DOUBLE OR HOLD</span><h2 id="game-push-title">翻倍或收手</h2></div>
            <strong>托管 ¤ {{ game.bet }}</strong>
        </header>

        <div class="game-push-stage">
            <div class="game-coin-stack" aria-label="已翻出的金币">
                <span v-if="game.revealedCoins === 0" class="game-empty-stack">尚未揭牌</span>
                <b v-for="coin in game.revealedCoins" :key="coin" class="game-revealed-coin">¤</b>
            </div>
            <div class="game-card-fan" aria-hidden="true">
                <i v-for="card in game.remainingCards" :key="card" :style="{ '--card': card }" />
            </div>
        </div>

        <div class="game-push-metrics">
            <div><span>可收手</span><strong>¤ {{ game.cashoutAmount }}</strong></div>
            <div><span>余牌</span><strong>{{ game.remainingCards }}</strong></div>
            <div><span>余雷</span><strong>{{ game.remainingBombs }}</strong></div>
            <div><span>下一张风险</span><strong>{{ percent(game.nextBombProbabilityBps) }}</strong></div>
        </div>

        <p class="game-rule-note">每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。</p>
        <div class="game-actions">
            <button
                v-if="game.legalActions.includes('draw')"
                type="button"
                class="game-primary-action"
                :disabled="Boolean(writeDisabledReason)"
                :title="writeDisabledReason"
                @click="emit('draw')"
            >
                再翻一张
            </button>
            <button
                v-if="game.legalActions.includes('cash-out')"
                type="button"
                class="game-secondary-action"
                :disabled="Boolean(writeDisabledReason)"
                :title="writeDisabledReason"
                @click="emit('cashOut')"
            >
                收手入账
            </button>
        </div>
    </section>
</template>
