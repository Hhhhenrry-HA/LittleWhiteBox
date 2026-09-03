<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { GamePushGameView, GameRecordView } from '../types.js';

const props = defineProps<{
    game: GamePushGameView;
    writeDisabledReason: string;
    ending?: GameRecordView | null;
    drawing?: boolean;
}>();

const emit = defineEmits<{
    draw: [];
    cashOut: [];
    lobby: [];
    finished: [];
}>();

const FLIP_MS = 660;

/**
 * The coin count arrives with the server response, but showing it immediately
 * would spoil the card that is still turning over. The stack is held back until
 * the flip lands.
 */
const shownCoins = ref(props.game.revealedCoins);
const shownStats = ref({
    cashoutAmount: props.game.cashoutAmount,
    remainingCards: props.game.remainingCards,
    remainingBombs: props.game.remainingBombs,
    nextBombProbabilityBps: props.game.nextBombProbabilityBps,
});
const flipFace = ref<'coin' | 'bomb' | null>(null);
const flipping = ref(false);
const flipLanded = ref(false);
let flipTimer = 0;

function syncStats(): void {
    shownStats.value = {
        cashoutAmount: props.game.cashoutAmount,
        remainingCards: props.game.remainingCards,
        remainingBombs: props.game.remainingBombs,
        nextBombProbabilityBps: props.game.nextBombProbabilityBps,
    };
}

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearFlipTimer(): void {
    if (flipTimer !== 0) {
        window.clearTimeout(flipTimer);
        flipTimer = 0;
    }
}

function flip(face: 'coin' | 'bomb', onLand: () => void): void {
    clearFlipTimer();
    flipFace.value = face;
    flipLanded.value = false;
    if (prefersReducedMotion() || typeof window === 'undefined') {
        flipping.value = true;
        flipLanded.value = true;
        onLand();
        return;
    }
    flipping.value = false;
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {flipping.value = true;});
    });
    flipTimer = window.setTimeout(() => {
        flipLanded.value = true;
        onLand();
    }, FLIP_MS);
}

watch(() => props.game.revealedCoins, (next, previous) => {
    if (next > previous) {
        flip('coin', () => {
            shownCoins.value = next;
            syncStats();
        });
        return;
    }
    shownCoins.value = next;
    syncStats();
});

watch(() => props.ending, (record) => {
    if (record?.outcome === 'busted') {flip('bomb', () => {});}
}, { immediate: true });

const busted = computed(() => props.ending?.outcome === 'busted');
const showOutcome = computed(() => Boolean(props.ending) && (!busted.value || flipLanded.value));
const controlsDisabled = computed(() => Boolean(props.writeDisabledReason) || Boolean(props.ending) || props.drawing);

function percent(basisPoints: number): string {
    return `${(basisPoints / 100).toFixed(basisPoints % 100 === 0 ? 0 : 2)}%`;
}

onUnmounted(clearFlipTimer);
</script>

<template>
    <section class="game-table game-push-table" aria-labelledby="game-push-title">
        <header class="game-table-heading">
            <button type="button" class="game-back" @click="emit('lobby')">返回大厅</button>
            <div><span>DOUBLE OR HOLD</span><h2 id="game-push-title">翻倍或收手</h2></div>
            <strong>托管 ¤ {{ game.bet }}</strong>
        </header>

        <div class="game-push-stage">
            <div
                v-if="flipFace || drawing"
                class="game-flip-slot"
                :class="{ 'is-flipped': flipping, 'is-shuffling': drawing && !flipFace }"
            >
                <div class="game-flip-card">
                    <span class="game-flip-back" aria-hidden="true" />
                    <span v-if="flipFace" class="game-flip-front" :class="`is-${flipFace}`">
                        {{ flipFace === 'bomb' ? '✸' : '¤' }}
                    </span>
                </div>
            </div>

            <div class="game-coin-stack" aria-label="已翻出的金币">
                <span v-if="shownCoins === 0 && !flipFace" class="game-empty-stack">尚未揭牌</span>
                <b v-for="coin in shownCoins" :key="coin" class="game-revealed-coin">¤</b>
            </div>
            <div class="game-card-fan" aria-hidden="true">
                <i v-for="card in shownStats.remainingCards" :key="card" :style="{ '--card': card }" />
            </div>
        </div>

        <div class="game-push-metrics">
            <div><span>可收手</span><strong>¤ {{ shownStats.cashoutAmount }}</strong></div>
            <div><span>余牌</span><strong>{{ shownStats.remainingCards }}</strong></div>
            <div><span>余雷</span><strong>{{ shownStats.remainingBombs }}</strong></div>
            <div><span>下一张风险</span><strong>{{ percent(shownStats.nextBombProbabilityBps) }}</strong></div>
        </div>

        <p class="game-rule-note">每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。</p>

        <p v-if="drawing" class="game-pending-verdict" role="status">正在翻牌并确认落账…</p>
        <div v-else-if="showOutcome && ending" class="game-reveal-outcome" :class="`is-${ending.outcomeTone}`">
            <strong>{{ ending.outcomeLabel }}</strong>
            <em>{{ ending.net > 0 ? '+' : '' }}{{ ending.net }} 小白币</em>
            <button type="button" class="game-primary-action" @click="emit('finished')">回到大厅</button>
        </div>
        <div v-else-if="!ending" class="game-actions">
            <button
                v-if="game.legalActions.includes('draw')"
                type="button"
                class="game-primary-action"
                :disabled="controlsDisabled"
                :title="writeDisabledReason"
                @click="emit('draw')"
            >
                再翻一张
            </button>
            <button
                v-if="game.legalActions.includes('cash-out')"
                type="button"
                class="game-secondary-action"
                :disabled="controlsDisabled"
                :title="writeDisabledReason"
                @click="emit('cashOut')"
            >
                收手入账
            </button>
        </div>
    </section>
</template>
