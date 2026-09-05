<script setup lang="ts">
import { computed, ref } from 'vue';
import type { MessagePayload } from '../../../domains/messages/types.js';
import MessageIcon from './MessageIcon.vue';
import type { MessagesClientState } from '../types.js';
import type { MessageDraft } from './draft.js';
const props = defineProps<{ disabled: boolean; sending: boolean; media: MessagesClientState['media']; waitingFor: string }>();
const emit = defineEmits<{ send: [payload: MessagePayload] }>();
const draft = defineModel<MessageDraft>('draft', { required: true });
const type = computed({ get: () => draft.value.type, set: value => {draft.value = { ...draft.value, type: value };} });
const text = computed({ get: () => draft.value.text, set: value => {draft.value = { ...draft.value, text: value };} });
const more = ref(false);
const placeholder = computed(() => type.value === 'image' ? '描述你发出的画面…' : type.value === 'voice' ? '写下这段语音说的话…' : '说点什么…');
function send() {
    const value = text.value.trim(); if (!value || props.disabled) {return;}
    emit('send', type.value === 'image' ? { type: 'image', description: value } : type.value === 'voice' ? { type: 'voice', transcript: value } : { type: 'text', text: value });
}
function keydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.isComposing) {event.preventDefault(); send();}
}
</script>
<template>
    <form class="messages-composer" @submit.prevent="send">
        <div v-if="more" class="messages-composer-types" aria-label="消息类型">
            <button type="button" :aria-pressed="type === 'text'" @click="type = 'text'">文字</button>
            <button type="button" :aria-pressed="type === 'image'" @click="type = 'image'"><MessageIcon name="image" />图片</button>
            <button type="button" :aria-pressed="type === 'voice'" @click="type = 'voice'"><MessageIcon name="voice" />语音</button>
        </div>
        <p v-if="waitingFor" class="messages-composer-wait" role="status">正在等待 {{ waitingFor }} 的回复。可以先写好，稍后发送。</p>
        <p v-if="type !== 'text'" class="messages-composer-hint">
            {{ type === 'image'
                ? media.image ? '描述你要发送的画面，发出后可生成图片。' : '发送画面描述；开启画图后可生成图片。'
                : media.voice ? '写下要说的话，发出后可播放语音。' : '发送语音原文；开启 TTS 后可播放。' }}
        </p>
        <div class="messages-composer-line">
            <button type="button" class="messages-icon-button messages-attach" :aria-expanded="more" aria-label="选择消息类型" @click="more = !more"><MessageIcon :name="more ? 'close' : 'plus'" /></button>
            <textarea v-model="text" rows="1" maxlength="4000" :placeholder="placeholder" :aria-label="placeholder" :disabled="sending" @keydown="keydown" />
            <button class="messages-send" type="submit" :disabled="disabled || !text.trim()" aria-label="发送"><MessageIcon name="send" /></button>
        </div>
    </form>
</template>
