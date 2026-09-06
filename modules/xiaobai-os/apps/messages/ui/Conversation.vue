<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import type { ContactView, ThreadPage, MessagesClientState } from '../types.js';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type { OutgoingMessage } from '../application/image-upload.js';
import MessageIcon from './MessageIcon.vue';
import MessageBubble from './MessageBubble.vue';
import MessageComposer from './MessageComposer.vue';
import ContactAvatar from './ContactAvatar.vue';
import type { MessageDraft } from './draft.js';
const draft = defineModel<MessageDraft>('draft', { required: true });
const props = defineProps<{ contact: ContactView; page: ThreadPage; bridge: XiaobaiOsAppProps['bridge']; chatIdentity: string; disabled: boolean; stage: string; loading: boolean; loadMore: () => Promise<void>; media: MessagesClientState['media']; waitingFor: string }>();
defineEmits<{ back: []; details: []; send: [payload: OutgoingMessage]; retry: [id: string]; deleteImage: [messageId: string] }>();
const scroller = ref<HTMLElement | null>(null);
let bottom = true; let older = false;
function scroll() {const el = scroller.value; if (el) {bottom = el.scrollHeight - el.clientHeight - el.scrollTop < 70;}}
async function stick() {await nextTick(); if (bottom && !older && scroller.value) {scroller.value.scrollTop = scroller.value.scrollHeight;}}
watch(() => [props.page.messages.at(-1)?.id, props.stage], stick, { immediate: true });
async function more() {
    const el = scroller.value; if (!el || older) {return;} older = true;
    const height = el.scrollHeight; const top = el.scrollTop;
    try {await props.loadMore(); await nextTick(); el.scrollTop = top + el.scrollHeight - height;}
    finally {older = false; scroll();}
}
const stages: Record<string, string> = { uploading: '正在发送图片…', saving: '正在保存消息…', syncing: '正在写入主聊天…', summarizing: '正在回顾你们的对话…', replying: '对方正在输入…' };
defineExpose({ sent() {bottom = true; void stick();} });
</script>
<template>
    <section class="messages-conversation">
        <header class="messages-thread-header"><button class="messages-icon-button" aria-label="返回信息" @click="$emit('back')"><MessageIcon name="back" /></button><ContactAvatar :identity="contact.id" :name="contact.name" small /><div><h2>{{ contact.name }}</h2></div><button class="messages-icon-button" aria-label="联系人详情" @click="$emit('details')"><MessageIcon name="more" /></button></header>
        <div ref="scroller" class="messages-thread-scroll" @scroll="scroll">
            <button v-if="page.hasMore" class="messages-older" :disabled="loading" @click="more">{{ loading ? '读取中…' : '查看更早的消息' }}</button>
            <p v-if="loading && !page.messages.length" class="messages-thread-start">正在读取消息…</p>
            <template v-for="(message, index) in page.messages" :key="message.id">
                <time v-if="index === 0 || message.createdAt - page.messages[index - 1].createdAt > 300000" class="messages-time">{{ new Date(message.createdAt).toLocaleString(undefined, { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</time>
                <MessageBubble :message="message" :bridge="bridge" :chat-identity="chatIdentity" :media="media" :disabled="disabled" @resize="stick" @delete-image="$emit('deleteImage', $event)" />
            </template>
            <div v-if="stage" class="messages-typing" role="status"><span><i /><i /><i /></span>{{ stages[stage] || '处理中…' }}</div>
            <button v-else-if="page.retryMessageId" class="messages-retry" :disabled="disabled" @click="$emit('retry', page.retryMessageId)">尚未收到回复 · 重试</button>
        </div>
        <MessageComposer v-model:draft="draft" :disabled="disabled" :sending="['uploading', 'saving'].includes(stage)" :waiting-for="waitingFor" @send="$emit('send', $event)" />
    </section>
</template>
