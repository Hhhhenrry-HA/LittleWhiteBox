<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { GameDiceRecordDetailView, GameDieFace, GameRecordView } from '../types.js';
import GameDie from './GameDie.vue';

const props = defineProps<{
    record: GameRecordView;
    detail: GameDiceRecordDetailView;
}>();

const emit = defineEmits<{ done: [] }>();

/** Each stage only ever adds information, so skipping ahead is always safe. */
type RevealStage = 'rolling' | 'counting' | 'verdict' | 'settled';
const STAGE_ORDER: readonly RevealStage[] = ['rolling', 'counting', 'verdict', 'settled'];
const DIE_STAGGER_MS = 85;
const ROLL_SETTLE_MS = 1500;
const COUNT_MS = 700;
const VERDICT_MS = 620;

const stage = ref<RevealStage>('rolling');
const timers: number[] = [];

function reachedStage(target: RevealStage): boolean {
    return STAGE_ORDER.indexOf(stage.value) >= STAGE_ORDER.indexOf(target);
}

function clearTimers(): void {
    while (timers.length > 0) {
        const timer = timers.pop();
        if (timer !== undefined) {window.clearTimeout(timer);}
    }
}

function skipToEnd(): void {
    clearTimers();
    stage.value = 'settled';
}

/** A 1 stands in for any called face, so it counts as a hit too. */
function isHit(die: GameDieFace): boolean {
    return die === 1 || die === props.detail.finalBid.face;
}

const dealerStagger = computed(() => props.detail.dealerDice.length * DIE_STAGGER_MS);
const bidHolds = computed(() => props.detail.matchingDiceCount >= props.detail.finalBid.count);
const challengerLabel = computed(() => (props.detail.challenger === 'player' ? '你' : '庄家'));
const bidderLabel = computed(() => (props.detail.finalBid.by === 'player' ? '你' : '庄家'));

onMounted(() => {
    if (typeof window === 'undefined') {
        stage.value = 'settled';
        return;
    }
    const countAt = dealerStagger.value + ROLL_SETTLE_MS;
    timers.push(window.setTimeout(() => {stage.value = 'counting';}, countAt));
    timers.push(window.setTimeout(() => {stage.value = 'verdict';}, countAt + COUNT_MS));
    timers.push(window.setTimeout(() => {stage.value = 'settled';}, countAt + COUNT_MS + VERDICT_MS));
});

onUnmounted(clearTimers);
</script>

<template>
    <section class="game-table game-dice-reveal" aria-labelledby="game-reveal-title">
        <header class="game-table-heading">
            <span class="game-reveal-eyebrow">SHOWDOWN</span>
            <div><span>{{ challengerLabel }}提出质疑</span><h2 id="game-reveal-title">摊牌</h2></div>
            <strong>{{ bidderLabel }}叫 {{ detail.finalBid.count }} × {{ detail.finalBid.face }} 点</strong>
        </header>

        <div class="game-reveal-cloth" @click="skipToEnd">
            <div class="game-reveal-side">
                <span>庄家</span>
                <div class="game-dice-row">
                    <GameDie
                        v-for="(die, index) in detail.dealerDice"
                        :key="`dealer:${index}`"
                        :value="die"
                        :delay="index * DIE_STAGGER_MS"
                        :highlight="reachedStage('counting') && isHit(die)"
                    />
                </div>
            </div>

            <div class="game-reveal-side">
                <span>你</span>
                <div class="game-dice-row">
                    <GameDie
                        v-for="(die, index) in detail.playerDice"
                        :key="`player:${index}`"
                        :value="die"
                        :delay="index * DIE_STAGGER_MS"
                        :highlight="reachedStage('counting') && isHit(die)"
                    />
                </div>
            </div>

            <p v-if="reachedStage('counting')" class="game-reveal-tally">
                <span>{{ detail.finalBid.face }} 点合计（1 点通配）</span>
                <strong>{{ detail.matchingDiceCount }}</strong>
                <span>枚</span>
            </p>

            <p v-if="reachedStage('verdict')" class="game-reveal-verdict" :class="bidHolds ? 'is-holds' : 'is-broken'">
                实际 {{ detail.matchingDiceCount }} 枚 {{ bidHolds ? '≥' : '<' }} 叫数 {{ detail.finalBid.count }} 枚
                <strong>{{ bidHolds ? '叫牌成立，质疑失败' : '叫牌不成立，质疑得手' }}</strong>
            </p>
        </div>

        <div v-if="reachedStage('settled')" class="game-reveal-outcome" :class="`is-${record.outcomeTone}`">
            <strong>{{ record.outcomeLabel }}</strong>
            <em>{{ record.net > 0 ? '+' : '' }}{{ record.net }} 小白币</em>
            <button type="button" class="game-primary-action" @click="emit('done')">回到大厅</button>
        </div>
        <p v-else class="game-reveal-hint">点击牌桌跳过</p>
    </section>
</template>
