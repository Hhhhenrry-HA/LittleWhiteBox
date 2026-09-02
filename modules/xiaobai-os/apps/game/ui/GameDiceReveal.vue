<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { GameDiceRecordDetailView, GameDieFace, GameRecordView } from '../types.js';
import GameDie from './GameDie.vue';
import { GAME_DIE_STAGGER_MS, gameDiceRevealTimeline } from './game-motion.js';

const props = defineProps<{
    record: GameRecordView;
    detail: GameDiceRecordDetailView;
}>();

const emit = defineEmits<{ done: [] }>();

/** Each stage only ever adds information, so skipping ahead is always safe. */
type RevealStage = 'rolling' | 'counting' | 'verdict' | 'settled';
const STAGE_ORDER: readonly RevealStage[] = ['rolling', 'counting', 'verdict', 'settled'];
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

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** A 1 stands in for any called face, so it counts as a hit too. */
function isHit(die: GameDieFace): boolean {
    return die === 1 || die === props.detail.finalBid.face;
}

const bidHolds = computed(() => props.detail.matchingDiceCount >= props.detail.finalBid.count);
const challengerLabel = computed(() => (props.detail.challenger === 'player' ? '你' : '庄家'));
const bidderLabel = computed(() => (props.detail.finalBid.by === 'player' ? '你' : '庄家'));
const playerOutcomeLabel = computed(() => (props.record.outcome === 'player-win' ? '你赢了' : '你输了'));
const signedNet = computed(() => `${props.record.net > 0 ? '+' : ''}${props.record.net} 小白币`);

onMounted(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) {
        stage.value = 'settled';
        return;
    }
    const timeline = gameDiceRevealTimeline(Math.max(
        props.detail.dealerDice.length,
        props.detail.playerDice.length,
    ));
    timers.push(window.setTimeout(() => {stage.value = 'counting';}, timeline.countAt));
    timers.push(window.setTimeout(() => {stage.value = 'verdict';}, timeline.verdictAt));
    timers.push(window.setTimeout(() => {stage.value = 'settled';}, timeline.settledAt));
});

onUnmounted(clearTimers);
</script>

<template>
    <section class="game-table game-dice-reveal" aria-labelledby="game-reveal-title">
        <header class="game-table-heading game-reveal-heading">
            <div><span>SHOWDOWN</span><h2 id="game-reveal-title">开骰</h2></div>
        </header>

        <div class="game-reveal-cloth" @click="skipToEnd">
            <div class="game-reveal-call">
                <span>最终叫牌 · {{ bidderLabel }}</span>
                <strong>{{ detail.finalBid.count }} 枚 {{ detail.finalBid.face }} 点</strong>
            </div>

            <div class="game-reveal-side">
                <span>庄家</span>
                <div class="game-dice-row">
                    <GameDie
                        v-for="(die, index) in detail.dealerDice"
                        :key="`dealer:${index}`"
                        :value="die"
                        :delay="index * GAME_DIE_STAGGER_MS"
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
                        :delay="index * GAME_DIE_STAGGER_MS"
                        :highlight="reachedStage('counting') && isHit(die)"
                    />
                </div>
            </div>

            <p v-if="reachedStage('counting')" class="game-reveal-tally">
                <span>实际开出（{{ detail.finalBid.face }} 点及 1 点）</span>
                <strong>{{ detail.matchingDiceCount }}</strong>
                <span>枚</span>
            </p>

            <div
                v-if="reachedStage('verdict')"
                class="game-reveal-verdict"
                :class="`is-${record.outcomeTone}`"
                role="status"
                aria-live="polite"
            >
                <small>本局结果</small>
                <div><strong>{{ playerOutcomeLabel }}</strong><em>{{ signedNet }}</em></div>
                <p>
                    实际 {{ detail.matchingDiceCount }} 枚 {{ bidHolds ? '≥' : '<' }} 叫牌 {{ detail.finalBid.count }} 枚；
                    {{ challengerLabel }}开骰，{{ bidderLabel }}的叫牌{{ bidHolds ? '成立' : '不成立' }}。
                </p>
            </div>
        </div>

        <div v-if="reachedStage('settled')" class="game-reveal-actions">
            <button type="button" class="game-primary-action" @click="emit('done')">回到大厅</button>
        </div>
        <p v-else class="game-reveal-hint">点击牌桌跳过</p>
    </section>
</template>
