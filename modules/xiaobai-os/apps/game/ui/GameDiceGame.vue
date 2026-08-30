<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { GameDiceBidView, GameDiceGameView } from '../types.js';

const props = defineProps<{
    game: GameDiceGameView;
    writeDisabledReason: string;
}>();

const emit = defineEmits<{
    bid: [bid: GameDiceBidView];
    challenge: [];
    lobby: [];
}>();

function bidKey(bid: GameDiceBidView): string {
    return `${bid.count}:${bid.face}`;
}

const selectedBid = ref(bidKey(props.game.legalBids[0] || { count: 1, face: 2 }));
const chosenBid = computed(() => props.game.legalBids.find(bid => bidKey(bid) === selectedBid.value) || null);
const currentBid = computed(() => props.game.bids.at(-1) || null);

watch(() => props.game.legalBids.map(bidKey).join('|'), () => {
    if (!chosenBid.value && props.game.legalBids[0]) {selectedBid.value = bidKey(props.game.legalBids[0]);}
});

function submitBid(): void {
    if (chosenBid.value && !props.writeDisabledReason) {
        emit('bid', { count: chosenBid.value.count, face: chosenBid.value.face });
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
                    <b v-for="(die, index) in game.playerDice" :key="index" class="game-die">{{ die }}</b>
                </div>
                <small>一点可代替任意叫面</small>
            </div>
        </div>

        <div class="game-dice-controls">
            <label v-if="game.legalActions.includes('bid')" class="game-bid-picker">
                <span>下一口合法叫数</span>
                <select v-model="selectedBid" :disabled="Boolean(writeDisabledReason)">
                    <option v-for="bid in game.legalBids" :key="bidKey(bid)" :value="bidKey(bid)">
                        {{ bid.count }} 枚 {{ bid.face }} 点
                    </option>
                </select>
            </label>
            <button
                v-if="game.legalActions.includes('bid')"
                type="button"
                class="game-primary-action"
                :disabled="Boolean(writeDisabledReason) || !chosenBid"
                :title="writeDisabledReason"
                @click="submitBid"
            >
                加叫
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
