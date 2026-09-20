<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import type { AdministratorRow } from '../domain/types.js';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import { ADMINISTRATOR_POLICY as POLICY } from '../domain/policy.js';
import { ADMINISTRATOR_COPY as C, administratorError } from './copy.js';
const props = defineProps<{ row: AdministratorRow; bridge: XiaobaiOsAppProps['bridge']; chatIdentity: string; disabled: boolean; resumable: boolean }>();
const emit = defineEmits<{ delete: [AdministratorRow]; regenerate: [AdministratorRow]; details: [AdministratorRow]; retry: [AdministratorRow] }>();
const menu = ref(false), offset = ref(0), content = ref(props.row.text), loading = ref(false), error = ref('');
let pageRequest = 0;
watch(() => [props.chatIdentity, props.row.id, props.row.revision], (value, previous) => {
    pageRequest++; loading.value = false; error.value = '';
    const sameMessage = value[0] === previous[0] && value[1] === previous[1];
    const next = sameMessage ? Math.min(offset.value, Math.max(0, Math.ceil(props.row.totalChars / POLICY.textBlock) - 1) * POLICY.textBlock) : 0;
    content.value = ''; offset.value = next;
    if (next === 0) { content.value = props.row.text; }
    else { void page(next); }
});
onBeforeUnmount(() => { pageRequest++; });
async function page(next: number) {
    if (loading.value) { return; }
    const request = ++pageRequest;
    const { turnId, role, revision } = props.row, chatIdentity = props.chatIdentity;
    const current = () => request === pageRequest && chatIdentity === props.chatIdentity && revision === props.row.revision && turnId === props.row.turnId;
    loading.value = true; error.value = '';
    try {
        const response = await props.bridge.request('administrator/text', { chatIdentity, turnId, role, revision, offset: next }) as { result: { text: string; offset: number } };
        if (!current()) { return; }
        content.value = response.result.text; offset.value = response.result.offset;
    } catch (cause) { if (current()) { error.value = administratorError(cause); } }
    finally { if (current()) { loading.value = false; } }
}
</script>

<template>
    <article class="admin-message" :class="`is-${row.role}`" :data-row-id="row.id">
        <div class="admin-bubble" tabindex="0" role="button" :aria-expanded="menu" :aria-label="C.messageActions" @click="menu = !menu" @keydown.enter.prevent="menu = !menu" @keydown.space.prevent="menu = !menu" @keydown.esc.stop="menu = false">
            <img v-if="row.image" :src="row.image.path" :alt="row.image.name" loading="lazy" class="admin-message-image">
            <p v-if="content" class="admin-prose">{{ content }}</p>
            <span v-if="!content && !row.image && !row.operationCount" class="admin-muted">{{ row.error || C.noReply }}</span>
        </div>
        <nav v-if="row.totalChars > POLICY.textBlock" class="admin-pager" :aria-label="C.messagePages">
            <button type="button" :disabled="offset === 0 || loading" @click="page(Math.max(0, offset - POLICY.textBlock))">{{ C.previousText }}</button>
            <button type="button" :disabled="offset + content.length >= row.totalChars || loading" @click="page(offset + content.length)">{{ C.moreText }}</button>
        </nav>
        <button v-if="row.operationCount" type="button" class="admin-operation-preview" @click="emit('details', row)">
            <span v-for="op in row.operations" :key="op.id" class="admin-operation-line">
                <i class="admin-operation-dot" :class="`is-${op.status}`" /><span>{{ op.name }}<small v-if="op.target"> · {{ op.target }}</small></span>
                <small>{{ C.operations[op.status] }}</small>
            </span>
            <span class="admin-operation-more">{{ C.details }} ›</span>
        </button>
        <p v-if="row.error || error" class="admin-error" role="status">{{ error || row.error }}</p>
        <nav v-if="menu" class="admin-message-actions" :aria-label="C.messageActions">
            <button type="button" :disabled="disabled" @click="emit('delete', row)">{{ C.delete }}</button>
            <button v-if="row.canRegenerate" type="button" :disabled="disabled" @click="emit('regenerate', row)">{{ C.regenerate }}</button>
            <button v-if="row.role === 'assistant' && row.status !== 'finished' && row.canRegenerate" type="button" :disabled="disabled" :title="resumable ? C.retry : C.readOnlyRetry" @click="emit('retry', row)">{{ resumable ? C.retry : C.recheck }}</button>
        </nav>
    </article>
</template>
