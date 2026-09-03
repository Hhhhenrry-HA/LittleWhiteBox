<script setup lang="ts">
import type { GameDiceBidView } from '../types.js';

defineProps<{
    finalBid: Required<GameDiceBidView>;
}>();

const DICE = Object.freeze(Array.from({ length: 10 }, (_, index) => index));
</script>

<template>
    <section class="game-table game-dice-commit" aria-labelledby="game-dice-commit-title">
        <header class="game-table-heading game-reveal-heading">
            <div><span>SHOWDOWN</span><h2 id="game-dice-commit-title">正在开骰</h2></div>
        </header>

        <div class="game-reveal-cloth game-commit-cloth" role="status" aria-live="polite">
            <div class="game-reveal-call">
                <span>最终叫牌 · {{ finalBid.by === 'player' ? '你' : '庄家' }}</span>
                <strong>{{ finalBid.count }} 枚 {{ finalBid.face }} 点</strong>
            </div>

            <div class="game-commit-dice" aria-hidden="true">
                <i
                    v-for="die in DICE"
                    :key="die"
                    :style="{ '--game-commit-delay': `${(die % 5) * 55}ms` }"
                />
            </div>

            <div class="game-commit-status">
                <span class="game-commit-pulse" aria-hidden="true" />
                <p><strong>骰盅已揭开</strong><small>正在确认本局与账本保存结果</small></p>
            </div>
            <p class="game-commit-note">保存确认前不会展示骰面或输赢。</p>
        </div>
    </section>
</template>
