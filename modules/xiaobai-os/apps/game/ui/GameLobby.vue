<script setup lang="ts">
import { computed, ref } from 'vue';
import type { GameActiveGameView, GameKind } from '../types.js';

const props = defineProps<{
    activeGame: GameActiveGameView | null;
    balance: number;
    lockedAmount: number;
    writeDisabledReason: string;
}>();

const emit = defineEmits<{
    start: [kind: GameKind, bet: number];
    continue: [kind: GameKind];
}>();

const diceBet = ref(50);
const ladderBet = ref(30);

const activeLabel = computed(() => {
    if (props.activeGame?.kind === 'dice') {return '秘骰对决';}
    if (props.activeGame?.kind === 'push') {return '翻倍或收手';}
    if (props.activeGame?.kind === 'ladder') {return '鎏金阶梯';}
    return '';
});

function diceReason(): string {
    if (props.writeDisabledReason) {return props.writeDisabledReason;}
    if (!Number.isSafeInteger(diceBet.value) || diceBet.value < 50 || diceBet.value > 500 || diceBet.value % 10 !== 0) {
        return '下注须为 50 至 500，且为 10 的倍数';
    }
    if (props.balance < diceBet.value) {return '余额不足';}
    return '';
}

function pushReason(): string {
    if (props.writeDisabledReason) {return props.writeDisabledReason;}
    if (props.balance < 50) {return '余额不足';}
    return '';
}

function ladderReason(): string {
    if (props.writeDisabledReason) {return props.writeDisabledReason;}
    if (!Number.isSafeInteger(ladderBet.value) || ladderBet.value < 30 || ladderBet.value > 800 || ladderBet.value % 10 !== 0) {
        return '下注须为 30 至 800，且为 10 的倍数';
    }
    if (props.balance < ladderBet.value) {return '余额不足';}
    return '';
}
</script>

<template>
    <section class="game-lobby" aria-labelledby="game-lobby-title">
        <div class="game-lobby-hero">
            <span class="game-eyebrow">THE GILDED PARLOUR</span>
            <h2 id="game-lobby-title">今夜，押注你的判断</h2>
            <p>三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。</p>
        </div>

        <article v-if="activeGame" class="game-continue-card">
            <div class="game-continue-seal" aria-hidden="true">续</div>
            <div>
                <span>牌桌仍在等候</span>
                <h3>{{ activeLabel }}</h3>
                <p>已有 ¤ {{ lockedAmount }} 托管在本局，离开页面不会结束赌局。</p>
            </div>
            <button type="button" @click="emit('continue', activeGame.kind)">继续本局</button>
        </article>

        <div v-else class="game-grid">
            <article class="game-card is-dice">
                <div class="game-glyph" aria-hidden="true"><span>⚄</span><span>⚂</span></div>
                <div class="game-copy">
                    <span class="game-card-index">TABLE 01</span>
                    <h3>秘骰对决</h3>
                    <p>五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。</p>
                    <ul>
                        <li>下注 50–500</li>
                        <li>胜出返还 1.8 倍</li>
                    </ul>
                </div>
                <label class="game-bet-field">
                    <span>下注</span>
                    <input v-model.number="diceBet" type="number" min="50" max="500" step="10">
                </label>
                <button
                    type="button"
                    class="game-table-button"
                    :disabled="Boolean(diceReason())"
                    :title="diceReason()"
                    @click="emit('start', 'dice', diceBet)"
                >
                    入席
                </button>
                <small v-if="diceReason()" class="game-card-reason">{{ diceReason() }}</small>
            </article>

            <article class="game-card is-push">
                <div class="game-glyph is-coin" aria-hidden="true">¤</div>
                <div class="game-copy">
                    <span class="game-card-index">TABLE 02</span>
                    <h3>翻倍或收手</h3>
                    <p>十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。</p>
                    <ul>
                        <li>固定下注 50</li>
                        <li>每枚金币价值 50</li>
                    </ul>
                </div>
                <div class="game-fixed-bet"><span>入场</span><strong>¤ 50</strong></div>
                <button
                    type="button"
                    class="game-table-button"
                    :disabled="Boolean(pushReason())"
                    :title="pushReason()"
                    @click="emit('start', 'push', 50)"
                >
                    揭牌
                </button>
                <small v-if="pushReason()" class="game-card-reason">{{ pushReason() }}</small>
            </article>

            <article class="game-card is-ladder">
                <div class="game-glyph is-ladder-mark" aria-hidden="true">Ⅴ</div>
                <div class="game-copy">
                    <span class="game-card-index">TABLE 03</span>
                    <h3>鎏金阶梯</h3>
                    <p>五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。</p>
                    <ul>
                        <li>下注 30–800</li>
                        <li>最高返还 50,000</li>
                    </ul>
                </div>
                <label class="game-bet-field">
                    <span>下注</span>
                    <input v-model.number="ladderBet" type="number" min="30" max="800" step="10">
                </label>
                <button
                    type="button"
                    class="game-table-button"
                    :disabled="Boolean(ladderReason())"
                    :title="ladderReason()"
                    @click="emit('start', 'ladder', ladderBet)"
                >
                    登阶
                </button>
                <small v-if="ladderReason()" class="game-card-reason">{{ ladderReason() }}</small>
            </article>
        </div>
    </section>
</template>
