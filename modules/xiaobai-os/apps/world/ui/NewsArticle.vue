<script setup lang="ts">
import { computed } from 'vue';
import type { WorldNews } from '../../../domains/world/types.js';

const props = defineProps<{ article: WorldNews; update: 'same' | 'updated' | 'removed' }>();
defineEmits<{ latest: [] }>();
const paragraphs = computed(() => props.article.body.split(/\n\s*\n|\n/).map(text => text.trim()).filter(Boolean));
</script>

<template>
    <article class="world-article">
        <p class="world-eyebrow">世界小刊 · 见闻</p>
        <h1 tabindex="-1">{{ article.title }}</h1>
        <div v-if="update !== 'same'" class="world-article-update" role="status">
            <template v-if="update === 'updated'">
                <span>这篇见闻有了新内容</span>
                <button type="button" @click="$emit('latest')">阅读新版 ↗</button>
            </template>
            <span v-else>这篇已退出本期，仍可读完当前内容。</span>
        </div>
        <p class="world-standfirst">{{ article.summary }}</p>
        <div class="world-article-body">
            <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
        </div>
        <p class="world-endmark" aria-label="全文完">◇</p>
    </article>
</template>
