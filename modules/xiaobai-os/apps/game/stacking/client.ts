import { computed, ref, shallowRef } from 'vue';
import type { XiaobaiOsFrameBridge } from '../../../shell/app-src/frame-bridge.js';
import type { Command } from './domain.js';
import type { StackingRequest, StackingView } from './service.js';
import { COPY, stackingErrorText } from './copy.js';
import { newStackingId } from './partition.js';
import type { RecoveryJournal } from './recovery.js';

export function createStackingClient(bridge: XiaobaiOsFrameBridge, chatIdentity: string, journal: RecoveryJournal) {
    const view = shallowRef<StackingView | null>(null);
    const busy = ref(false), error = ref(''), generating = ref(false);
    const failed = shallowRef<StackingRequest | null>(null);
    const recoveryBlocked = ref(false);
    let disposed = false;
    let pushed: StackingView | null = null;
    const blocked = computed(() => busy.value || recoveryBlocked.value || !!failed.value || !view.value?.ready || view.value.writeState !== 'ready' || view.value.pending);
    function apply(next: StackingView) {
        if (disposed) { return; }
        view.value = next;
    }
    function restoreIntent() {
        const intent = journal.read(), state = view.value;
        if (!intent || !state?.ready) { return; }
        if (state.active?.id === intent.runId && state.revision === intent.request.revision) { failed.value = intent.request; }
        else if (state.writeState === 'ready' && !state.pending) { journal.clear(); }
    }
    async function request(type: 'read' | 'confirm' | 'act' | 'sound', input?: StackingRequest | { enabled: boolean }): Promise<boolean> {
        if (disposed || busy.value) { return false; }
        busy.value = true; pushed = null; generating.value = !!input && 'command' in input && input.command.type === 'start'; error.value = '';
        try {
            if (type === 'act' && input && 'command' in input && input.command.type !== 'start' && view.value?.active) {
                // Do not send a risky placement unless this exact intent can survive a hard reload.
                failed.value = input;
                journal.write({ runId: view.value.active.id, request: input });
            }
            const reply = await bridge.request(`game/stacking/${type}`, { chatIdentity, ...input }, 35000) as { result: StackingView };
            const latest = pushed as StackingView | null;
            apply(latest && latest.revision >= reply.result.revision ? latest : reply.result);
            restoreIntent(); recoveryBlocked.value = false;
            if (view.value?.writeState === 'ready' && !view.value.pending
                && (!failed.value || view.value.revision > failed.value.revision)) { failed.value = null; }
            return true;
        } catch (cause) {
            if (!disposed) {
                if (pushed) { apply(pushed); }
                if (type === 'sound') { throw cause; }
                error.value = stackingErrorText(cause);
                const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : cause instanceof Error ? cause.message : '';
                if (code === 'stacking_recovery') { recoveryBlocked.value = true; }
                if (input && 'command' in input && (code.startsWith('stacking_save_') || code.startsWith('host_request_'))) { failed.value = input; }
                else if (type === 'act' && code !== 'stacking_recovery') {
                    // A definitive domain rejection did not accept the operation.
                    try { journal.clear(); failed.value = null; } catch (cause) { recoveryBlocked.value = true; error.value = stackingErrorText(cause); }
                }
            }
            return false;
        } finally { if (!disposed) { busy.value = false; generating.value = false; } }
    }
    const unsubscribe = bridge.subscribe(message => {
        if (disposed || message.type !== 'game/stacking/state') { return; }
        const payload = message.payload as { chatIdentity: string; state: StackingView };
        if (payload.chatIdentity === chatIdentity) {
            if (busy.value) { pushed = payload.state; } else { apply(payload.state); }
        }
    });
    async function recover() {
        let retry = failed.value;
        if (!await request('confirm') || !view.value || view.value.writeState !== 'ready' || view.value.pending) { return; }
        retry ??= failed.value;
        // Retry only when confirmation proves the original command was not applied.
        if (retry && view.value.revision === retry.revision) { await request('act', retry); }
    }
    return { view, busy, error, generating, blocked, failed,
        notice: computed(() => error.value || (recoveryBlocked.value ? COPY.recoveryProblem : view.value?.writeState === 'conflict' ? COPY.conflict
            : view.value?.pending || view.value?.writeState === 'unconfirmed' ? COPY.saveProblem : '')),
        read: () => request('read'), recover,
        setSoundEnabled: (enabled: boolean) => request('sound', { enabled }),
        act: (command: Command) => blocked.value ? Promise.resolve(false) : request('act', {
            actionId: newStackingId(), revision: view.value!.revision, command,
        }),
        dispose() { disposed = true; unsubscribe(); },
    };
}
