<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type { WorldNews } from '../../../domains/world/types.js';
import NewsArticle from './NewsArticle.vue';
import WorldOpening from './WorldOpening.vue';
import { useWorldState } from './use-world-state.js';
import './world.css';

const props = defineProps<XiaobaiOsAppProps>();
const { state, pending, writable, refreshing, notice, error, request } = useWorldState(props);
const reading = shallowRef<WorldNews | null>(null);
const listing = ref<HTMLElement | null>(null);
const articlePage = ref<HTMLElement | null>(null);
const menu = ref<HTMLDetailsElement | null>(null);
const title = ref<HTMLHeadingElement | null>(null);
let listScroll = 0;
let returnId = '';
const latest = computed(() => state.value.world.news.find(item => item.id === reading.value?.id));
const articleUpdate = computed(() => !latest.value ? 'removed'
    : JSON.stringify(latest.value) === JSON.stringify(reading.value) ? 'same' : 'updated');
const hasContent = computed(() => !!state.value.world.overview || state.value.world.news.length > 0);
const canRefresh = computed(() => writable.value && !refreshing.value);

async function openArticle(item: WorldNews) {
    listScroll = listing.value?.scrollTop ?? 0;
    returnId = item.id;
    reading.value = structuredClone(toRaw(item));
    await nextTick();
    articlePage.value?.querySelector('h1')?.focus({ preventScroll: true });
}
async function back() {
    reading.value = null;
    await nextTick();
    if (listing.value) {
        listing.value.scrollTop = listScroll;
        const buttons = listing.value.querySelectorAll<HTMLButtonElement>('[data-article-id]');
        const target = [...buttons].find(button => button.dataset.articleId === returnId) ?? title.value;
        target?.focus({ preventScroll: true });
    }
}
async function readLatest() {
    if (!latest.value) { return; }
    reading.value = structuredClone(toRaw(latest.value));
    await nextTick();
    if (articlePage.value) { articlePage.value.scrollTop = 0; }
    articlePage.value?.querySelector('h1')?.focus({ preventScroll: true });
}
function closeMenu() { if (menu.value) { menu.value.open = false; menu.value.querySelector('summary')?.focus(); } }
function dismissMenu(event: Event) {
    if (menu.value && event.target instanceof Node && !menu.value.contains(event.target)) { menu.value.open = false; }
}
function leaveMenu(event: FocusEvent) {
    if (menu.value && (!(event.relatedTarget instanceof Node) || !menu.value.contains(event.relatedTarget))) { menu.value.open = false; }
}
</script>

<template>
    <section class="world-app" aria-label="世界新闻" @pointerdown="dismissMenu">
        <header class="world-toolbar">
            <button v-if="reading" type="button" class="world-back" @click="back">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
                <span>见闻</span>
            </button>
            <h1 v-else ref="title" class="world-toolbar-title" tabindex="-1">世界</h1>
            <div class="world-tools">
                <button
                    type="button" class="world-icon-button" :disabled="!canRefresh" aria-label="刷新新闻"
                    :title="refreshing ? '正在更新世界近况' : '刷新新闻，会使用模型'" @click="request('refresh')"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" :class="{ 'world-spinning': refreshing }">
                        <path d="M20 10a8 8 0 1 0-1 6M20 4v6h-6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <details ref="menu" class="world-menu" @keydown.esc.stop.prevent="closeMenu" @focusout="leaveMenu">
                    <summary aria-label="新闻设置" title="新闻设置">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
                    </summary>
                    <div class="world-menu-sheet">
                        <span class="world-menu-heading">订阅与背景</span>
                        <button type="button" :disabled="!writable" @click="request('subscribe', { enabled: !state.world.subscribed })">
                            <span>{{ state.world.subscribed ? '取消订阅' : '订阅新闻' }}</span>
                            <span class="world-menu-value">{{ state.world.subscribed ? '已订阅' : '未订阅' }}</span>
                        </button>
                        <p>订阅后随剧情更新新闻，会使用模型。取消后保留已有内容。</p>
                        <label>
                            <span>作为剧情背景</span>
                            <input
                                type="checkbox" :checked="state.world.injectToStory" :disabled="!writable"
                                @change="request('background', { enabled: ($event.target as HTMLInputElement).checked })"
                            >
                        </label>
                        <p>将概况与短摘要提供给后续剧情。独立于订阅开关。</p>
                    </div>
                </details>
            </div>
        </header>

        <div v-if="notice" class="world-notice" :class="{ 'is-error': error }" role="status" aria-live="polite">
            <span>{{ notice }}</span>
            <button v-if="state.writeState === 'unconfirmed' || (state.pendingSave && state.writeState === 'failed')" :disabled="pending" type="button" @click="request('confirm-save')">核实保存</button>
            <button v-else-if="state.writeState === 'conflict'" :disabled="pending" type="button" @click="request('adopt-server-state')">读取服务器版本</button>
            <button
                v-else-if="state.writeState === 'failed' || error" :disabled="pending || state.writeState === 'saving'" type="button"
                @click="request(state.maintenance === 'error' && state.writeState === 'ready' ? 'refresh' : 'read')"
            >
                {{ state.maintenance === 'error' && state.writeState === 'ready' ? '重试更新' : '重试读取' }}
            </button>
        </div>

        <div v-show="!reading" ref="listing" class="world-scroll world-listing">
            <WorldOpening :overview="state.world.overview" />

            <section v-if="state.world.news.length" class="world-news-list" aria-label="各处见闻">
                <div class="world-section-heading"><span>各处见闻</span><span>{{ state.world.news.length }} 则</span></div>
                <article v-for="item in state.world.news" :key="item.id" class="world-news-item">
                    <button type="button" :data-article-id="item.id" @click="openArticle(item)">
                        <span class="world-item-text"><h2>{{ item.title }}</h2><span class="world-item-summary">{{ item.summary }}</span></span>
                        <svg class="world-item-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                    </button>
                </article>
            </section>
            <section v-else class="world-empty">
                <h2>{{ refreshing ? '正在收集远方的见闻' : state.world.subscribed ? '见闻还在路上' : hasContent ? '继续看看各处的消息' : '远方，也有故事' }}</h2>
                <p>{{ state.world.subscribed ? '已订阅，新闻会随剧情持续更新。\n有了新的见闻，就会出现在这里。' : '认识镜头之外的人与事。\n订阅后，新的见闻会随剧情陆续到来。' }}</p>
                <button
                    type="button" class="world-primary" :disabled="!canRefresh"
                    @click="state.world.subscribed ? request('refresh') : request('subscribe', { enabled: true })"
                >
                    {{ refreshing ? '正在更新…' : pending ? '正在处理…' : state.world.subscribed ? '获取新闻' : '订阅新闻' }}
                </button>
                <small>获取及维护新闻会使用已配置的模型</small>
            </section>
        </div>

        <div v-if="reading" ref="articlePage" class="world-scroll world-reading">
            <NewsArticle :article="reading" :update="articleUpdate" @latest="readLatest" />
            <button type="button" class="world-bottom-back" @click="back">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
                返回见闻
            </button>
        </div>
    </section>
</template>
