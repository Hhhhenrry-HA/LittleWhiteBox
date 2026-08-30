<script setup lang="ts">
import type { GameLadderChoice, GameLadderGameView } from '../types.js';

const props = defineProps<{
    game: GameLadderGameView;
    writeDisabledReason: string;
}>();

const emit = defineEmits<{
    step: [choice: GameLadderChoice];
    cashOut: [];
    lobby: [];
}>();

const CHOICE_COPY = Object.freeze({
    safe: { name: '稳', note: '守住筹码' },
    medium: { name: '中', note: '均衡一搏' },
    risky: { name: '险', note: '追逐高筹' },
});

function percent(basisPoints: number): string {
    return `${basisPoints / 100}%`;
}
</script>

<template>
    <section class="game-table game-ladder-table" aria-labelledby="game-ladder-title">
        <header class="game-table-heading">
            <button type="button" class="game-back" @click="emit('lobby')">返回大厅</button>
            <div><span>THE GILDED ASCENT</span><h2 id="game-ladder-title">鎏金阶梯</h2></div>
            <strong>托管 ¤ {{ game.bet }}</strong>
        </header>

        <div class="game-ladder-stage">
            <div class="game-ladder-track" aria-label="五层挑战进度">
                <div
                    v-for="floor in 5"
                    :key="floor"
                    class="game-ladder-floor"
                    :class="{ 'is-complete': floor <= game.completedFloors, 'is-next': floor === game.completedFloors + 1 }"
                >
                    <span>{{ floor }}</span>
                    <small v-if="game.steps[floor - 1]">¤ {{ game.steps[floor - 1]?.amountAfterSuccess }}</small>
                    <small v-else>第 {{ floor }} 层</small>
                </div>
            </div>
            <div class="game-ladder-purse">
                <span>{{ game.canCashOut ? '当前可收手' : '风险起点' }}</span>
                <strong>¤ {{ game.cashoutAmount }}</strong>
                <small>已完成 {{ game.completedFloors }} / 5 层</small>
            </div>
        </div>

        <div v-if="game.legalActions.includes('step')" class="game-ladder-choices">
            <button
                v-for="option in game.nextChoices"
                :key="option.choice"
                type="button"
                :class="`is-${option.choice}`"
                :disabled="Boolean(writeDisabledReason)"
                :title="writeDisabledReason"
                @click="emit('step', option.choice)"
            >
                <span>{{ CHOICE_COPY[option.choice].name }}</span>
                <small>{{ CHOICE_COPY[option.choice].note }}</small>
                <strong>{{ percent(option.successProbabilityBps) }}</strong>
                <em>成功得 ¤ {{ option.successAmount }}</em>
            </button>
        </div>
        <button
            v-if="game.legalActions.includes('cash-out')"
            type="button"
            class="game-ladder-cashout"
            :disabled="Boolean(writeDisabledReason)"
            :title="writeDisabledReason"
            @click="emit('cashOut')"
        >
            收手并领取 ¤ {{ game.cashoutAmount }}
        </button>
    </section>
</template>
