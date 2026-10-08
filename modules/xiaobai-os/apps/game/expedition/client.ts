import { computed, ref, shallowRef } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { COPY, errorText } from './copy.js';
import { newId } from './random.js';
import { parseCommand } from './partition.js';
import type { ExpeditionRequest, ExpeditionView } from './service.js';
import type { Command } from './types.js';
import type { Participant } from './content/participants.js';
import { CAMPAIGN_COPY } from './content/campaign-copy.js';

export function createExpeditionClient(bridge: XiaobaiOsFrameBridge, chatIdentity: string) {
    const view = shallowRef<ExpeditionView | null>(null), busy = ref(false), error = ref('');
    const failed = shallowRef<ExpeditionRequest | null>(null);
    const requestingTalk = ref(false), uncertainTalk = ref(false);
    const dismissedFailure = ref<string | null>(null);
    const conversationFailure = computed(() => view.value?.replyFailure?.actionId === dismissedFailure.value ? null : view.value?.replyFailure ?? null);
    const talking = computed(() => requestingTalk.value || !!view.value?.conversation);
    const readNeeded = ref(false);
    const dataInvalid = ref(false);
    let disposed = false, pushed: ExpeditionView | null = null;
    const blocked = computed(() => busy.value || talking.value || uncertainTalk.value || !!failed.value || !view.value?.ready || view.value.writeState !== 'ready' || view.value.pending);
    function apply(next: ExpeditionView) { if (!disposed && (!view.value || next.data.revision >= view.value.data.revision)) { view.value = next; } }
    async function request(type: 'read' | 'act' | 'confirm' | 'rebuild', input?: ExpeditionRequest): Promise<boolean> {
        if (disposed || busy.value) { return false; }
        busy.value = true; pushed = null; error.value = '';
        try {
            const reply = await bridge.request(`game/expedition/${type}`, { chatIdentity, ...(type === 'rebuild' ? { actionId: newId() } : {}), ...input }, 35000) as { result: ExpeditionView };
            const latest = pushed as ExpeditionView | null;
            apply(latest && latest.data.revision >= reply.result.data.revision ? latest : reply.result);
            readNeeded.value = false; dataInvalid.value = false;
            if (view.value?.writeState === 'ready' && !view.value.pending && type !== 'read') { failed.value = null; }
            return true;
        } catch (cause) {
            if (!disposed) {
                readNeeded.value = true;
                if (pushed) { apply(pushed); } error.value = errorText(cause);
                const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : '';
                dataInvalid.value = code === 'expedition_data_invalid';
                if (input && (code.startsWith('expedition_save_') || code.startsWith('host_request_'))) { failed.value = input; }
            }
            return false;
        } finally { if (!disposed) { busy.value = false; } }
    }
    const unsubscribe = bridge.subscribe(message => {
        if (disposed) { return; }
        if (message.type === 'game/expedition/error') {
            const payload = message.payload as { chatIdentity: string; code: string };
            if (payload.chatIdentity === chatIdentity) { error.value = errorText(payload); dataInvalid.value = payload.code === 'expedition_data_invalid'; }
            return;
        }
        if (message.type !== 'game/expedition/state') { return; }
        const payload = message.payload as { chatIdentity: string; state: ExpeditionView };
        if (payload.chatIdentity !== chatIdentity) { return; }
        if (busy.value) { pushed = payload.state; } else { apply(payload.state); }
    });
    async function recover() {
        const retry = failed.value;
        if (!await request('confirm') || !view.value || view.value.writeState !== 'ready' || view.value.pending) { return false; }
        if (retry && view.value.data.revision === retry.revision) { return request('act', retry); }
        failed.value = null; uncertainTalk.value = false; return true;
    }
    async function talk(person: Participant, text: string) {
        if (blocked.value || disposed) { return false; }
        const actionId = newId();
        requestingTalk.value = true; busy.value = true; error.value = ''; pushed = null;
        try {
            const reply = await bridge.request('game/expedition/talk', { chatIdentity, actionId, revision: view.value!.data.revision, person, text }, 180000) as { result: ExpeditionView };
            const latest = pushed as ExpeditionView | null;
            apply(latest && latest.data.revision >= reply.result.data.revision ? latest : reply.result); return true;
        } catch (cause) {
            if (!disposed) {
                if (pushed) { apply(pushed); }
                const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : cause instanceof Error ? cause.message : '';
                if (code === 'expedition_cancelled') { error.value = ''; return false; }
                uncertainTalk.value = code.startsWith('host_request_') || code.startsWith('expedition_save_');
                error.value = uncertainTalk.value ? CAMPAIGN_COPY.aiUnknown : view.value?.replyFailure?.actionId === actionId ? '' : errorText(cause);
            }
            return false;
        } finally { requestingTalk.value = false; if (!disposed) { busy.value = false; } }
    }
    async function cancelTalk() {
        if (!talking.value) { return; }
        try { await bridge.request('game/expedition/cancel', { chatIdentity }, 35000); }
        catch (cause) { if (!disposed) { error.value = errorText(cause); } }
    }
    const recoveryRequired = computed(() => readNeeded.value || !!failed.value || uncertainTalk.value || !view.value || view.value.pending || view.value.writeState !== 'ready');
    return { view, busy, error, blocked, failed, talking, uncertainTalk, talk, cancelTalk, recoveryRequired, dataInvalid, conversationFailure,
        dismissConversationFailure() { dismissedFailure.value = view.value?.replyFailure?.actionId ?? null; },
        rebuild: () => request('rebuild'),
        dismissError() { if (!recoveryRequired.value) { error.value = ''; } },
        notice: computed(() => error.value || (view.value && (view.value.pending || view.value.writeState !== 'ready') ? COPY.saveError : '')),
        read: () => request('read'), recover,
        act: (command: Command) => blocked.value ? Promise.resolve(false) : request('act', { actionId: newId(), revision: view.value!.data.revision, command: parseCommand(command) }),
        dispose() { disposed = true; unsubscribe(); },
    };
}
export type ExpeditionClient = ReturnType<typeof createExpeditionClient>;
