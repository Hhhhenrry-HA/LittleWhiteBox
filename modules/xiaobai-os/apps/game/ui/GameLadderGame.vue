<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { GameLadderChoice, GameLadderGameView, GameRecordView } from '../types.js';

const props = defineProps<{
    game: GameLadderGameView;
    writeDisabledReason: string;
    ending?: GameRecordView | null;
    stepping?: boolean;
}>();

const emit = defineEmits<{
    step: [choice: GameLadderChoice];
    cashOut: [];
    lobby: [];
    finished: [];
}>();

const CHOICE_COPY = Object.freeze({
    safe: { name: '稳', note: '守住筹码' },
    medium: { name: '中', note: '均衡一搏' },
    risky: { name: '险', note: '追逐高筹' },
});

const JUDGE_MS = 720;
const SETTLE_MS = 620;

/**
 * The result is already known when the response lands, so the floor count and
 * the purse are both held back: letting the amount rise early would give the
 * verdict away before the step has been judged.
 */
const shownFloors = ref(props.game.completedFloors);
const shownCashout = ref(props.game.cashoutAmount);
const shownCanCashOut = ref(props.game.canCashOut);
const judgingFloor = ref(0);
const verdict = ref<'rise' | 'fall' | null>(null);
const timers: number[] = [];

function prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clearTimers(): void {
    while (timers.length > 0) {
        const timer = timers.pop();
        if (timer !== undefined) {window.clearTimeout(timer);}
    }
}

function judge(result: 'rise' | 'fall', onLand: () => void): void {
    clearTimers();
    judgingFloor.value = shownFloors.value + 1;
    verdict.value = null;
    if (prefersReducedMotion() || typeof window === 'undefined') {
        verdict.value = result;
        onLand();
        return;
    }
    timers.push(window.setTimeout(() => {
        verdict.value = result;
        onLand();
        // A finished hand keeps its final floor lit; only a mid-game success
        // hands the track back to the normal "next floor" styling.
        if (result === 'rise' && !props.ending) {
            timers.push(window.setTimeout(() => {
                judgingFloor.value = 0;
                verdict.value = null;
            }, SETTLE_MS));
        }
    }, JUDGE_MS));
}

watch(() => props.game.completedFloors, (next, previous) => {
    if (next > previous) {
        judge('rise', () => {
            shownFloors.value = next;
            shownCashout.value = props.game.cashoutAmount;
            shownCanCashOut.value = props.game.canCashOut;
        });
        return;
    }
    shownFloors.value = next;
    shownCashout.value = props.game.cashoutAmount;
    shownCanCashOut.value = props.game.canCashOut;
});

// The ending snapshot is the frame *before* the final step, so the last beat has
// to come from the record itself rather than from the game view.
watch(() => props.ending, (record) => {
    if (!record || record.detail.kind !== 'ladder') {return;}
    const last = record.detail.steps.at(-1);
    if (!last) {return;}
    judge(last.success ? 'rise' : 'fall', () => {
        if (last.success) {
            shownFloors.value = last.floor;
            shownCashout.value = last.amountAfterStep;
        }
    });
}, { immediate: true });

const settling = computed(() => judgingFloor.value > 0 && verdict.value === null);
const showOutcome = computed(() => Boolean(props.ending) && (verdict.value !== null || judgingFloor.value === 0));
const controlsDisabled = computed(() => (
    Boolean(props.writeDisabledReason) || Boolean(props.ending) || judgingFloor.value > 0 || props.stepping
));

function floorState(floor: number): Record<string, boolean> {
    return {
        'is-complete': floor <= shownFloors.value,
        'is-next': floor === shownFloors.value + 1 && judgingFloor.value === 0,
        'is-waiting': props.stepping && floor === shownFloors.value + 1,
        'is-judging': floor === judgingFloor.value && verdict.value === null,
        'is-risen': floor === judgingFloor.value && verdict.value === 'rise',
        'is-fallen': floor === judgingFloor.value && verdict.value === 'fall',
    };
}

function percent(basisPoints: number): string {
    return `${basisPoints / 100}%`;
}

onUnmounted(clearTimers);
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
                    :class="floorState(floor)"
                >
                    <span>{{ floor }}</span>
                    <small v-if="game.steps[floor - 1] && floor <= shownFloors">
                        ¤ {{ game.steps[floor - 1]?.amountAfterSuccess }}
                    </small>
                    <small v-else>第 {{ floor }} 层</small>
                </div>
            </div>
            <div class="game-ladder-purse">
                <span>{{ shownCanCashOut ? '当前可收手' : '风险起点' }}</span>
                <strong>¤ {{ shownCashout }}</strong>
                <small>已完成 {{ shownFloors }} / 5 层</small>
            </div>
        </div>

        <p v-if="stepping" class="game-ladder-settling" role="status">正在踏上第 {{ shownFloors + 1 }} 层并确认落账…</p>

        <div v-else-if="showOutcome && ending" class="game-reveal-outcome" :class="`is-${ending.outcomeTone}`">
            <strong>{{ ending.outcomeLabel }}</strong>
            <em>{{ ending.net > 0 ? '+' : '' }}{{ ending.net }} 小白币</em>
            <button type="button" class="game-primary-action" @click="emit('finished')">回到大厅</button>
        </div>

        <p v-else-if="settling" class="game-ladder-settling" role="status">正在判定第 {{ judgingFloor }} 层…</p>

        <template v-else-if="!ending">
            <div v-if="game.legalActions.includes('step')" class="game-ladder-choices">
                <button
                    v-for="option in game.nextChoices"
                    :key="option.choice"
                    type="button"
                    :class="`is-${option.choice}`"
                    :disabled="controlsDisabled"
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
                :disabled="controlsDisabled"
                :title="writeDisabledReason"
                @click="emit('cashOut')"
            >
                收手并领取 ¤ {{ shownCashout }}
            </button>
        </template>
    </section>
</template>
