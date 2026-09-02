<script setup lang="ts">
import type { TaskBoardPresentation } from '../types.js';

defineProps<{
    board: TaskBoardPresentation | null;
    busy: boolean;
    disabledReason: string;
}>();

const emit = defineEmits<{
    refresh: [];
    accept: [boardId: string, listingId: string];
}>();
</script>

<template>
    <section class="tasks-page tasks-board-page">
        <header class="tasks-page-heading">
            <div><small>WORLD CONTRACT FEED / 06 CHANNELS</small><h2>世界任务大厅</h2></div>
            <button
                type="button"
                class="tasks-agent-button"
                :disabled="busy || Boolean(disabledReason)"
                :title="disabledReason"
                @click="emit('refresh')"
            >
                <span aria-hidden="true">✦</span>{{ busy ? '正在刷新…' : '刷新任务（使用 Agent）' }}
            </button>
        </header>

        <div v-if="!board" class="tasks-empty">
            <span>NO CONTRACT SIGNAL</span>
            <h3>大厅暂时没有委托</h3>
            <p>打开页面不会调用模型。只有点击刷新后，任务终端才读取当前聊天资料生成一组尚未发生的委托。</p>
        </div>
        <div v-else class="tasks-board-grid">
            <article v-for="listing in board.listings" :key="listing.listingId" class="tasks-listing" :class="{ 'is-accepted': listing.accepted }">
                <div class="tasks-grade" :data-grade="listing.grade"><strong>{{ listing.grade }}</strong><small>{{ listing.tags[0] }}</small></div>
                <div class="tasks-listing-body">
                    <header><div><span>{{ listing.posture }}</span><span>{{ listing.timing }}</span></div><strong>¤ {{ listing.reward }}</strong></header>
                    <h3>{{ listing.title }}</h3>
                    <p class="tasks-hook">{{ listing.hook }}</p>
                    <dl>
                        <div><dt>唯一目标</dt><dd>{{ listing.objective }}</dd></div>
                        <div v-if="listing.requirements"><dt>执行约束</dt><dd>{{ listing.requirements }}</dd></div>
                        <div><dt>地点</dt><dd>{{ listing.location }}</dd></div>
                        <div><dt>风险</dt><dd>{{ listing.risk }}</dd></div>
                    </dl>
                    <footer>
                        <div class="tasks-tags"><span v-for="tag in listing.tags" :key="tag">{{ tag }}</span></div>
                        <button
                            type="button"
                            :disabled="listing.accepted || busy || Boolean(disabledReason)"
                            :title="disabledReason"
                            @click="emit('accept', board.boardId, listing.listingId)"
                        >
                            {{ listing.accepted ? '已接取' : '接取任务' }}
                        </button>
                    </footer>
                </div>
            </article>
        </div>
    </section>
</template>
