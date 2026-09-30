<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue';
import type { LearningClientState } from '../types.js';
import type { LearningPresentation } from '../application/presentation.js';
import type { LearningDialogueView } from '../application/message-view.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import { LEARNING_OPENING_MESSAGES } from '../agent/opening-prompts.js';
import LearningIcon from './LearningIcon.vue';
import LearningMessages from './LearningMessages.vue';
import { isLearningConversation, isLearningPreparation } from '../agent/access.js';
import { useLearningUiSession } from './learning-session.js';
import { rememberLearningEditor as vRememberEditor } from './learning-editor.js';

const props = defineProps<{ state: LearningClientState; disabled: boolean; pending: boolean }>();
// Preparation is workbench activity, not a succession of empty chat messages.
const conversationTurns = computed(() => props.state.conversation.turns.map((turn, index) => ({ turn, index }))
    .filter(({ turn }) => !isLearningPreparation({ kind: turn.purpose ?? 'talk' }) || turn.status === 'running'));
const copy = { conversation: '和语伴聊天', history: '更早的聊天已收起', empty: '今天想聊什么？', select: '先选一位语伴', opening: '打个招呼' };
// Workbench instructions are not words the learner typed. Keep replies and failures, not synthetic user bubbles.
const internalRequests = new Set<LearningDialogueView['purpose']>(['prepare', 'complete', 'grade', 'revision-review', 'model-essay', 'review-prepare', 'review-assess', 'companion']);
const emit = defineEmits<{ action: [name: string, input?: Record<string, unknown>]; present: [target: LearningPresentation]; profile: [] }>();
const session = useLearningUiSession().chat;
const message = toRef(session, 'text');
const composer = ref<HTMLTextAreaElement | null>(null);
const heading = ref<HTMLElement | null>(null);
const scroller = ref<HTMLElement | null>(null);
const focus = toRef(session, 'focus');
let resizeObserver: ResizeObserver | null = null;
let resizeFrame = 0;
function trackScroll() {
    const area = scroller.value;
    if (area) { session.scroll = area.scrollTop; session.following = area.scrollHeight - area.scrollTop - area.clientHeight < 70; }
}
async function follow() {
    await nextTick();
    if (session.following && scroller.value) { scroller.value.scrollTop = scroller.value.scrollHeight; }
}
function resizeComposer() {
    const input = composer.value;
    if (!input?.clientWidth) { return; }
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
    void follow();
}
watch(message, resizeComposer, { flush: 'post' });
watch(composer, input => {
    resizeObserver?.disconnect();
    cancelAnimationFrame(resizeFrame);
    if (!input) { return; }
    let width = 0;
    resizeObserver = new ResizeObserver(([entry]) => {
        if (entry.contentRect.width === width) { return; }
        width = entry.contentRect.width;
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(resizeComposer);
    });
    resizeObserver.observe(input.parentElement!);
}, { flush: 'post' });
onMounted(() => { if (scroller.value) { scroller.value.scrollTop = session.scroll; } void follow(); });
onBeforeUnmount(() => { if (scroller.value) { session.scroll = scroller.value.scrollTop; } resizeObserver?.disconnect(); cancelAnimationFrame(resizeFrame); });
function send() {
    if (props.disabled || !message.value.trim()) { return; }
    const sent = message.value.trim();
    session.sent = { text: message.value, user: focus.value?.selection ? `${sent}\n\n${focus.value.selection.quote}` : sent,
        after: props.state.conversation.turns.length + props.state.conversation.removedTurns };
    session.following = true;
    emit('action', focus.value ? 'explain' : 'talk', { message: sent, ...(focus.value ?? session.study ?? {}) });
}
watch([() => props.state.conversation.turns, () => props.state.chatBusy], follow);
function available(target: LearningPresentation) {
    if (target.kind === 'replacement') { return !props.disabled && props.state.currentUnitId === target.unitId; }
    const unit = [props.state.unit, props.state.review].find(entry => entry?.id === target.unitId);
    return !!unit && (target.kind === 'exercise' ? unit.exercises : unit.materials).some(entry => entry.id === target.id);
}
// Notes are read back in the lesson workspace; a review reply must not be saved into that lesson.
const replyUnit = computed(() => props.state.unit?.id === props.state.reply?.unitId ? props.state.unit : null);
defineExpose({ async ask(exerciseId?: string, selection?: LearningSelection, unitId = props.state.unit?.id) {
    focus.value = { unitId, exerciseId, selection };
    session.study = unitId ? { unitId, exerciseId } : null;
    await nextTick(); composer.value?.focus();
},
    focusHeading: () => heading.value?.focus({ preventScroll: true }) });
</script>

<template>
    <section class="learning-conversation">
        <header class="learning-conversation-heading"><span class="learning-person-initial">{{ [...(state.teacher?.name ?? '伴')][0] }}</span><h1 ref="heading" tabindex="-1">{{ state.teacher?.name ?? '语伴' }}</h1><button type="button" :disabled="disabled" aria-label="更换学习语言和语伴" @click="emit('profile')">{{ new Intl.DisplayNames(['zh-CN'], { type: 'language' }).of(state.language) }}</button></header>
        <div ref="scroller" class="learning-conversation-turns" :aria-label="copy.conversation" @scroll="trackScroll">
            <p v-if="state.conversation.removedTurns" class="learning-history-notice">{{ copy.history }}</p>
            <div v-for="({ turn, index }, position) in conversationTurns" :key="state.conversation.removedTurns + index" class="learning-conversation-turn">
                <p v-if="turn.user && !internalRequests.has(turn.purpose) && !isLearningPreparation({ kind: turn.purpose ?? 'talk' })" class="learning-conversation-user">{{ turn.user }}</p>
                <LearningMessages :turn="turn" :disabled="pending" @stop="emit('action', isLearningConversation({ kind: turn.purpose ?? 'talk' }) ? 'cancel-chat' : isLearningPreparation({ kind: turn.purpose ?? 'talk' }) ? 'cancel-preparation' : 'cancel')" />
                <p v-if="turn.message" class="learning-turn-notice" :class="{ 'is-error': turn.status === 'failed' }" role="status">{{ turn.message }}</p>
                <button v-if="turn.presentation" type="button" class="learning-activity-link" :disabled="!available(turn.presentation)" @click="emit('present', turn.presentation)"><LearningIcon :name="turn.presentation.kind === 'material' ? 'book' : 'records'" /><span>{{ turn.presentation.title }}</span><LearningIcon name="arrow" /></button>
                <div v-if="position === conversationTurns.length - 1 && state.reply?.text === turn.teacher" class="learning-conversation-tools"><button v-if="[...turn.teacher].length <= 1000" type="button" :disabled="disabled" @click="emit('action', 'say-reply')"><LearningIcon name="sound" />听语伴说</button><button v-if="state.reply.exerciseId && replyUnit && [...turn.teacher].length <= 4000" type="button" :disabled="disabled || replyUnit.notes.some(note => note.text === turn.teacher)" @click="emit('action', 'save-note', { unitId: replyUnit.id })">保存笔记</button></div>
            </div>
            <div v-if="state.chatBusy && !state.conversation.turns.some(turn => turn.status === 'running' && isLearningConversation({ kind: turn.purpose ?? 'talk' }))" class="learning-working" role="status"><span class="learning-working-dot" aria-hidden="true" /><span>{{ state.chatMessage }}</span></div>
            <p v-else-if="!state.chatBusy && state.chatMessage" class="learning-turn-notice is-error" role="status">{{ state.chatMessage }}</p>
            <div v-if="!conversationTurns.length && !state.chatBusy" class="learning-conversation-empty"><LearningIcon name="chat" /><p>{{ state.teacher ? copy.empty : copy.select }}</p><button v-if="!state.teacher" class="learning-primary" type="button" @click="emit('profile')">{{ copy.select }}</button><button v-else type="button" :disabled="disabled" @click="emit('action', 'talk', { message: state.profile ? LEARNING_OPENING_MESSAGES.returning : LEARNING_OPENING_MESSAGES.initial })">{{ copy.opening }}</button></div>
        </div>
        <form v-if="state.teacher" class="learning-conversation-compose" @submit.prevent="send">
            <div class="learning-composer-surface">
                <div v-if="focus" class="learning-composer-quote"><span>{{ focus.selection?.quote ?? '请教这道题' }}</span><button type="button" aria-label="取消引用" @click="focus = null">×</button></div>
                <div class="learning-composer-row">
                    <textarea ref="composer" v-model="message" v-remember-editor="session" rows="1" :disabled="state.chatStorage !== 'ready'" :maxlength="focus?.selection ? 1800 : focus?.exerciseId ? 2000 : 4000" aria-label="和语伴说" placeholder="和语伴说…" @keydown.ctrl.enter.prevent="send" @keydown.meta.enter.prevent="send" />
                    <button :type="state.chatBusy ? 'button' : 'submit'" :class="state.chatBusy ? 'learning-composer-stop' : 'learning-primary'" :disabled="state.chatBusy ? pending : disabled || !message.trim()" :aria-label="state.chatBusy ? '停止回复' : '发送给语伴'" :title="state.chatBusy ? '停止回复' : '发送给语伴'" @click.prevent="state.chatBusy ? emit('action', 'cancel-chat') : send()"><LearningIcon :name="state.chatBusy ? 'stop' : 'send'" /></button>
                </div>
            </div>
        </form>
    </section>
</template>
