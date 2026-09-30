<script setup lang="ts">
import { computed } from 'vue';
import type { LearningMessageView } from '../application/message-view.js';
import MessageMarkdown from '../../../shell/app-src/components/MessageMarkdown.vue';

const props = defineProps<{ messages: LearningMessageView[]; running: boolean }>();
// Display batches are derived from the same assistant/tool messages used for provider replay.
const batches = computed(() => {
    const groups: { message: LearningMessageView; results: LearningMessageView[] }[] = [];
    for (const message of props.messages) {
        if (message.role === 'assistant') { groups.push({ message, results: [] }); }
        else if (message.role === 'tool') { groups.at(-1)?.results.push(message); }
    }
    return groups.map(group => ({ message: group.message, tools: (group.message.toolCalls ?? []).map(call => {
        const result = group.results.find(result => result.toolCallId === call.id);
        const status = group.message.streaming ? 'generating' : result?.streaming ? 'running'
            : result?.content ? (result.error || failed(result.content) ? 'failed' : 'done') : props.running && !group.message.error ? 'pending' : 'cancelled';
        return { call, result, status };
    }).filter(tool => tool.status !== 'done') }));
});
const labels: Record<string, string> = {
    LearningRead: '查看学习记录', LearningContextRead: '查看相关资料', LearningSearch: '寻找文章', LearningExtract: '阅读原文',
    LearningProfileEdit: '调整学习目标', LearningLessonEdit: '准备练习', LearningRequest: '安排练习', LearningModelEssay: '准备范文',
    LearningAssess: '批改作答', LearningHelp: '准备讲解', LearningPresent: '打开练习', LearningComplete: '整理学习收获',
};
const statuses: Record<string, string> = { generating: '准备中', pending: '准备中', running: '进行中', failed: '未完成', cancelled: '已停止' };
const copy = { thinking: '正在想…', request: '准备学习内容' };
function failed(content: string) {
    try { return JSON.parse(content)?.ok === false; } catch { return false; }
}
</script>

<template>
    <div class="learning-messages">
        <template v-for="(batch, index) in batches" :key="index">
            <p v-if="batch.message.hasReasoning && batch.message.streaming && !batch.message.content && !batch.tools.length" class="learning-reasoning" role="status">{{ copy.thinking }}</p>
            <div v-if="batch.message.content" class="learning-output" :class="{ 'is-streaming': batch.message.streaming }">
                <MessageMarkdown v-if="batch.message.content" class="learning-markdown" :text="batch.message.content" />
            </div>
            <ul v-if="batch.tools.length" class="learning-tool-details" role="status">
                <li v-for="tool in batch.tools" :key="tool.call.id" :class="{ 'is-failed': tool.status === 'failed' }">
                    <span class="learning-tool-name">{{ labels[tool.call.name] || copy.request }}</span><span class="learning-tool-status">{{ statuses[tool.status] }}</span>
                </li>
            </ul>
        </template>
    </div>
</template>
