import { computed, ref, shallowRef } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import { COPY, errorText } from './copy.js';
import { newId } from './random.js';
import { parseCommand } from './partition.js';
import type { ExpeditionRequest, ExpeditionView } from './service.js';
import type { Command } from './types.js';

export function createExpeditionClient(bridge: XiaobaiOsFrameBridge, chatIdentity: string) {
    const view = shallowRef<ExpeditionView | null>(null), busy = ref(false), error = ref('');
    const failed = shallowRef<ExpeditionRequest | null>(null);
    let disposed = false, pushed: ExpeditionView | null = null;
    const blocked = computed(() => busy.value || !!failed.value || !view.value?.ready || view.value.writeState !== 'ready' || view.value.pending);
    function apply(next: ExpeditionView) { if (!disposed && (!view.value || next.data.revision >= view.value.data.revision)) { view.value = next; } }
    async function request(type: 'read' | 'act' | 'confirm', input?: ExpeditionRequest): Promise<boolean> {
        if (disposed || busy.value) { return false; }
        busy.value = true; pushed = null; error.value = '';
        try {
            const reply = await bridge.request(`game/expedition/${type}`, { chatIdentity, ...input }, 35000) as { result: ExpeditionView };
            const latest = pushed as ExpeditionView | null;
            apply(latest && latest.data.revision >= reply.result.data.revision ? latest : reply.result);
            if (view.value?.writeState === 'ready' && !view.value.pending && type !== 'read') { failed.value = null; }
            return true;
        } catch (cause) {
            if (!disposed) {
                if (pushed) { apply(pushed); } error.value = errorText(cause);
                const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : '';
                if (input && (code.startsWith('expedition_save_') || code.startsWith('host_request_'))) { failed.value = input; }
            }
            return false;
        } finally { if (!disposed) { busy.value = false; } }
    }
    const unsubscribe = bridge.subscribe(message => {
        if (disposed || message.type !== 'game/expedition/state') { return; }
        const payload = message.payload as { chatIdentity: string; state: ExpeditionView };
        if (payload.chatIdentity !== chatIdentity) { return; }
        if (busy.value) { pushed = payload.state; } else { apply(payload.state); }
    });
    async function recover() {
        const retry = failed.value;
        if (!await request('confirm') || !view.value || view.value.writeState !== 'ready' || view.value.pending) { return false; }
        if (retry && view.value.data.revision === retry.revision) { return request('act', retry); }
        failed.value = null; return true;
    }
    return { view, busy, error, blocked, failed,
        notice: computed(() => error.value || (view.value && (view.value.pending || view.value.writeState !== 'ready') ? COPY.saveError : '')),
        read: () => request('read'), recover,
        act: (command: Command) => blocked.value ? Promise.resolve(false) : request('act', { actionId: newId(), revision: view.value!.data.revision, command: parseCommand(command) }),
        dispose() { disposed = true; unsubscribe(); },
    };
}
export type ExpeditionClient = ReturnType<typeof createExpeditionClient>;
