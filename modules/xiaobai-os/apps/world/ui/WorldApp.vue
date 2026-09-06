<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type { WorldNews } from '../../../domains/world/types.js';
import NewsArticle from './NewsArticle.vue';
import { useWorldState } from './use-world-state.js';
import './world.css';

const props = defineProps<XiaobaiOsAppProps>();
const { state, pending, writable, refreshing, notice, error, request } = useWorldState(props);
const reading = shallowRef<WorldNews | null>(null);
const listing = ref<HTMLElement | null>(null);
const articlePage = ref<HTMLElement | null>(null);
const menu = ref<HTMLDetailsElement | null>(null);
const overviewExpanded = ref(false);
let listScroll = 0;
let returnId = '';
const latest = computed(() => state.value.world.news.find(item => item.id === reading.value?.id));
const articleUpdate = computed(() => !latest.value ? 'removed'
    : JSON.stringify(latest.value) === JSON.stringify(reading.value) ? 'same' : 'updated');
const hasContent = computed(() => !!state.value.world.overview || state.value.world.news.length > 0);
const canRefresh = computed(() => writable.value && !refreshing.value);
const overviewLong = computed(() => [...state.value.world.overview].length > 100);

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
        const target = [...buttons].find(button => button.dataset.articleId === returnId) ?? listing.value.querySelector('h1');
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
</script>

<template>
    <section class="world-app" aria-label="世界新闻">
        <header class="world-toolbar">
            <button v-if="reading" type="button" class="world-back" @click="back">‹ <span>本期</span></button>
            <span v-else class="world-toolbar-title">世界</span>
            <div class="world-tools">
                <button
                    type="button" class="world-icon-button" :disabled="!canRefresh" aria-label="刷新新闻"
                    :title="refreshing ? '正在更新世界近况' : '刷新新闻，会使用模型'" @click="request('refresh')"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" :class="{ 'world-spinning': refreshing }">
                        <path d="M20 10a8 8 0 1 0-1 6M20 4v6h-6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <details ref="menu" class="world-menu" @keydown.esc.stop.prevent="closeMenu">
                    <summary aria-label="新闻设置" title="新闻设置">···</summary>
                    <div class="world-menu-sheet">
                        <span class="world-menu-heading">订阅与背景</span>
                        <button type="button" :disabled="!writable" @click="request('subscribe', { enabled: !state.world.subscribed })">
                            <span>{{ state.world.subscribed ? '取消订阅' : '订阅新闻' }}</span>
                            <span class="world-menu-value">{{ state.world.subscribed ? '已订阅' : '未订阅' }}</span>
                        </button>
                        <p>订阅后随剧情维护新闻，会使用模型。取消后保留本期内容。</p>
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
            <div class="world-masthead">
                <p class="world-eyebrow">镜头之外 · 万事有声</p>
                <h1 tabindex="-1">世界小刊<span class="world-seal" aria-hidden="true">见<br>闻</span></h1>
                <div class="world-edition-line"><span>此时，此地之外</span><span>{{ state.world.subscribed ? '已订阅' : '随心翻阅' }}</span></div>
            </div>

            <section v-if="state.world.overview" class="world-overview" aria-label="世界近况">
                <h2>世界近况</h2>
                <p :class="{ 'is-folded': overviewLong && !overviewExpanded }">{{ state.world.overview }}</p>
                <button v-if="overviewLong" type="button" :aria-expanded="overviewExpanded" @click="overviewExpanded = !overviewExpanded">
                    {{ overviewExpanded ? '收起近况 −' : '展开近况 +' }}
                </button>
            </section>

            <div v-if="state.world.news.length" class="world-news-list">
                <article v-for="(item, index) in state.world.news" :key="item.id" class="world-news-item" :class="{ 'is-lead': index === 0 }">
                    <button type="button" :data-article-id="item.id" @click="openArticle(item)">
                        <span class="world-item-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                        <span class="world-item-text"><h2>{{ item.title }}</h2><span class="world-item-summary">{{ item.summary }}</span></span>
                        <span class="world-item-arrow" aria-hidden="true">↗</span>
                    </button>
                </article>
                <p class="world-colophon">世界依然在发生。<br><span>下次翻开，也许又有新的见闻。</span></p>
            </div>
            <section v-else class="world-empty">
                <svg viewBox="0 0 136 110" fill="none" aria-hidden="true">
                    <path d="m22 20 42-8 48 13v67L64 80l-42 8z" fill="var(--world-paper-raised)" stroke="currentColor" stroke-width="1.2" />
                    <path d="M64 12v68M32 35l22-4M32 43l22-4m-22 18 22-4m-22 10 22-4m20-24 27 7m-27 3 27 7m-27 13 27 7" stroke="currentColor" stroke-opacity=".4" />
                    <path d="m75 18 12 3v20l-6-6-6 3z" fill="var(--world-red)" />
                </svg>
                <h2>{{ refreshing ? '正在收集远方的见闻' : state.world.subscribed ? '让世界慢慢展开' : hasContent ? '世界近况已在这里' : '你的故事之外，\n世界也有故事' }}</h2>
                <p>{{ state.world.subscribed ? '已订阅。故事开场后，新闻会随剧情持续维护。' : '风物、人情，还有远方正在发生的小事。\n订阅新闻，让这片世界有自己的生活。' }}</p>
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
            <button type="button" class="world-bottom-back" @click="back">‹ 返回本期</button>
        </div>
    </section>
</template>
