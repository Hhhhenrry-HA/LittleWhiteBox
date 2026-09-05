<script setup lang="ts">
import { computed, ref } from 'vue';
import type { GameActiveGameView, GameKind } from '../types.js';
import { GAME_ROOMS, gameRoom } from './room-catalog.js';
defineProps<{ activeGame: GameActiveGameView | null }>();
defineEmits<{ open: [kind: GameKind] }>();
const search = ref('');
const category = ref('全部');
const categories = ['全部', ...new Set(GAME_ROOMS.map((room) => room.category))];
const visible = computed(() =>
    GAME_ROOMS.filter(
        (room) =>
            (category.value === '全部' || room.category === category.value) &&
            (room.name + room.tagline + room.category).includes(search.value.trim()),
    ),
);
</script>
<template>
    <section class="game-lobby">
        <div class="game-lobby-intro">
            <span>小白游艺室</span>
            <h2>故事之外，<br>玩一小局。</h2>
            <p>斗点智，碰点运气。<br>输赢都是小白币。</p>
            <div class="game-lobby-emblem" aria-hidden="true"><i>✦</i><b>玩</b><small>一局好时光</small></div>
        </div>
        <button v-if="activeGame" type="button" class="game-continue" @click="$emit('open', activeGame.kind)">
            <img :src="gameRoom(activeGame.kind).artwork" alt=""><span><small>你的这一局还在</small><strong>{{ gameRoom(activeGame.kind).name }}</strong></span><b>继续玩 →</b>
        </button>
        <div class="game-browse-heading">
            <h3>挑个好玩的</h3>
            <span>{{ GAME_ROOMS.length }} 款游戏</span>
        </div>
        <label class="game-search"><svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4 4" /></svg><input v-model="search" type="search" placeholder="找个游戏" aria-label="搜索游戏"></label>
        <nav class="game-categories" aria-label="游戏分类">
            <button
                v-for="item in categories"
                :key="item"
                type="button"
                :aria-pressed="category === item"
                @click="category = item"
            >
                {{ item }}
            </button>
        </nav>
        <div class="game-shelf">
            <button
                v-for="room in visible"
                :key="room.id"
                type="button"
                class="game-tile"
                :class="'tone-' + room.tone"
                @click="$emit('open', room.id)"
            >
                <div class="game-tile-art">
                    <img :src="room.artwork" alt="" loading="lazy"><span>{{ room.category }}</span>
                </div>
                <div class="game-tile-copy">
                    <h3>{{ room.name }}</h3>
                    <p>{{ room.tagline }}</p>
                    <span>{{ room.entry }} <i aria-hidden="true">↗</i></span>
                </div>
            </button>
        </div>
        <div v-if="!visible.length" class="game-empty">
            <h3>没找到这个游戏</h3>
            <p>换个名字，或者看看其他分类。</p>
            <button
                type="button"
                @click="
                    search = '';
                    category = '全部';
                "
            >
                查看全部
            </button>
        </div>
    </section>
</template>
