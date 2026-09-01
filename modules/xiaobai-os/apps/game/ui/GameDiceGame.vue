<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { GameDiceBidFace, GameDiceBidView, GameDiceGameView } from '../types.js';
import { GAME_DIE_PIPS } from './die-pips.js';
import GameDie from './GameDie.vue';

const props = defineProps<{
    game: GameDiceGameView;
    writeDisabledReason: string;
}>();

const emit = defineEmits<{
    bid: [bid: GameDiceBidView];
    challenge: [];
    lobby: [];
}>();

/** A 1 is wild, so it can never be named as a bid face. */
const BID_FACES: readonly GameDiceBidFace[] = [2, 3, 4, 5, 6];

const opening = props.game.legalBids[0] || { count: 1, face: 2 as GameDiceBidFace };
const count = ref(opening.count);
const face = ref<GameDiceBidFace>(opening.face);

const currentBid = computed(() => props.game.bids.at(-1) || null);
const minimumRaise = computed(() => props.game.legalBids[0] || null);

const countBounds = computed(() => {
    const counts = props.game.legalBids.map(bid => bid.count);
    if (counts.length === 0) {return { min: 1, max: 10 };}
    return { min: Math.min(...counts), max: Math.max(...counts) };
});

const chosenBid = computed(() => props.game.legalBids.find(
    bid => bid.count === count.value && bid.face === face.value,
) || null);

function faceAvailable(candidate: GameDiceBidFace): boolean {
    return props.game.legalBids.some(bid => bid.face === candidate);
}

function stepCount(delta: number): void {
    const next = count.value + delta;
    const { min, max } = countBounds.value;
    if (next >= min && next <= max) {count.value = next;}
}

// The face is a preference and survives the round; the count has to track the
// table, so it is only pulled up when the old value can no longer be legal.
watch(() => countBounds.value.min, (min) => {
    if (count.value < min) {count.value = min;}
});

function submitBid(): void {
    if (chosenBid.value && !props.writeDisabledReason) {
        emit('bid', { count: chosenBid.value.count, face: chosenBid.value.face });
    }
}

function submitMinimumRaise(): void {
    const raise = minimumRaise.value;
    if (raise && !props.writeDisabledReason) {
        count.value = raise.count;
        face.value = raise.face;
        emit('bid', { count: raise.count, face: raise.face });
    }
}
</script>

<template>
    <section class="game-table game-dice-table" aria-labelledby="game-dice-title">
        <header class="game-table-heading">
            <button type="button" class="game-back" @click="emit('lobby')">返回大厅</button>
            <div><span>LIAR'S DICE</span><h2 id="game-dice-title">秘骰对决</h2></div>
            <strong>托管 ¤ {{ game.bet }}</strong>
        </header>

        <div class="game-dice-cloth">
            <div class="game-dealer-position">
                <span class="game-dealer-chip" aria-hidden="true">庄</span>
                <p>{{ currentBid?.by === 'dealer' ? '庄家已经加叫，轮到你决断。' : '庄家静候你的第一口价。' }}</p>
            </div>

            <div v-if="currentBid" class="game-current-bid">
                <small>桌面叫数</small>
                <strong>{{ currentBid.count }}</strong>
                <span>枚 {{ currentBid.face }} 点</span>
                <em>{{ currentBid.by === 'dealer' ? '庄家' : '你' }}叫牌</em>
            </div>
            <div v-else class="game-current-bid is-empty"><span>等待首轮叫牌</span></div>

            <div class="game-player-hand">
                <span>你的骰子</span>
                <div class="game-dice-row">
                    <GameDie
                        v-for="(die, index) in game.playerDice"
                        :key="index"
                        :value="die"
                        :delay="index * 85"
                    />
                </div>
                <small>一点可代替任意叫面</small>
            </div>
        </div>

        <div v-if="game.legalActions.includes('bid')" class="game-bid-builder">
            <div class="game-bid-count" role="group" aria-label="叫牌数量">
                <button
                    type="button"
                    :disabled="Boolean(writeDisabledReason) || count <= countBounds.min"
                    aria-label="减少数量"
                    @click="stepCount(-1)"
                >
                    −
                </button>
                <strong>{{ count }}</strong>
                <button
                    type="button"
                    :disabled="Boolean(writeDisabledReason) || count >= countBounds.max"
                    aria-label="增加数量"
                    @click="stepCount(1)"
                >
                    +
                </button>
                <small>枚</small>
            </div>

            <div class="game-bid-faces" role="group" aria-label="叫牌点数">
                <button
                    v-for="option in BID_FACES"
                    :key="option"
                    type="button"
                    class="game-face-chip"
                    :class="{ 'is-active': option === face }"
                    :disabled="Boolean(writeDisabledReason) || !faceAvailable(option)"
                    :aria-pressed="option === face"
                    :aria-label="`${option} 点`"
                    @click="face = option"
                >
                    <span class="game-face-pips">
                        <i
                            v-for="([row, column], index) in GAME_DIE_PIPS[option]"
                            :key="index"
                            :style="{ gridArea: `${row} / ${column}` }"
                        />
                    </span>
                </button>
            </div>
        </div>

        <div class="game-dice-controls">
            <button
                v-if="game.legalActions.includes('bid') && minimumRaise"
                type="button"
                class="game-table-button game-min-raise"
                :disabled="Boolean(writeDisabledReason)"
                :title="writeDisabledReason"
                @click="submitMinimumRaise"
            >
                最小加叫 {{ minimumRaise.count }} × {{ minimumRaise.face }}
            </button>
            <button
                v-if="game.legalActions.includes('bid')"
                type="button"
                class="game-primary-action"
                :disabled="Boolean(writeDisabledReason) || !chosenBid"
                :title="chosenBid ? writeDisabledReason : '这口叫数不高于桌面叫数'"
                @click="submitBid"
            >
                加叫 {{ count }} × {{ face }}
            </button>
            <button
                v-if="game.legalActions.includes('challenge')"
                type="button"
                class="game-danger-action"
                :disabled="Boolean(writeDisabledReason)"
                :title="writeDisabledReason"
                @click="emit('challenge')"
            >
                质疑
            </button>
        </div>

        <ol v-if="game.bids.length" class="game-bid-history" aria-label="公开叫牌记录">
            <li v-for="(bid, index) in game.bids" :key="`${index}:${bid.count}:${bid.face}`">
                <span>{{ bid.by === 'player' ? '你' : '庄家' }}</span>
                <strong>{{ bid.count }} × {{ bid.face }} 点</strong>
            </li>
        </ol>
    </section>
</template>
