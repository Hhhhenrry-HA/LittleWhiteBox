<script setup lang="ts">
import type { TaskBoardPresentation } from '../types.js';
import TaskIcon from './TaskIcon.vue';
import { taskMoney } from './task-display.js';
defineProps<{ board: TaskBoardPresentation | null; busy: boolean; disabledReason: string }>();
defineEmits<{ refresh: []; detail: [boardId: string, listingId: string] }>();
</script>
<template>
    <section class="tasks-page tasks-board-page">
        <div class="tasks-hero">
            <div><span class="tasks-eyebrow">由任务终端发布</span><h2>下一段故事，<br>从这里开始。</h2><p>接下一份委托，让行动有所回响。</p></div>
            <div class="tasks-hero-art" aria-hidden="true"><div class="tasks-paper is-back" /><div class="tasks-paper"><i /><i /><i /><span><TaskIcon name="check" /></span></div></div>
        </div>
        <header class="tasks-section-heading"><h3>发现委托 <small v-if="board">{{ board.listings.length }}</small></h3><button type="button" class="tasks-text-button" :disabled="busy || Boolean(disabledReason)" @click="$emit('refresh')"><TaskIcon name="refresh" :class="{ 'is-spinning': busy }" />{{ busy ? '正在寻找…' : board ? '换一批' : '获取委托' }}</button></header>
        <p v-if="disabledReason" class="tasks-hint" role="status">{{ disabledReason }}</p>
        <div v-if="!board || !board.listings.length" class="tasks-empty"><span class="tasks-empty-mark"><TaskIcon name="compass" /></span><h3>{{ busy ? '正在寻找新的委托' : '你的下一份委托，在这里' }}</h3><p>{{ busy ? '生成会在后台继续，你可以先去别处看看。' : '从当前故事中发现可以行动的机会。' }}</p><button v-if="!busy" type="button" class="tasks-primary-button" :disabled="Boolean(disabledReason)" @click="$emit('refresh')">获取第一批委托</button></div>
        <div v-else class="tasks-board-list" :aria-busy="busy">
            <button v-for="listing in board.listings" :key="listing.listingId" type="button" class="tasks-ticket" :class="{ 'is-accepted': listing.accepted }" @click="$emit('detail', board.boardId, listing.listingId)">
                <span class="tasks-ticket-top"><span class="tasks-grade" :data-grade="listing.grade">{{ listing.grade }}</span><span class="tasks-ticket-tags">{{ listing.tags.slice(0, 2).join(' · ') }}</span><span v-if="listing.accepted" class="tasks-accepted"><TaskIcon name="check" />已接取</span><span v-else class="tasks-ticket-posture">{{ listing.posture }}</span></span>
                <strong class="tasks-ticket-title">{{ listing.title }}</strong><span class="tasks-ticket-hook">{{ listing.hook }}</span>
                <span class="tasks-ticket-location"><TaskIcon name="pin" />{{ listing.location }}</span>
                <span class="tasks-ticket-foot"><span class="tasks-reward"><small>¤</small> {{ taskMoney(listing.reward) }} <em>任务报酬</em></span><span class="tasks-ticket-open">查看委托<TaskIcon name="next" /></span></span>
            </button>
        </div>
        <p class="tasks-footnote">报酬由任务终端提供 · 接取后自动托管</p>
    </section>
</template>
