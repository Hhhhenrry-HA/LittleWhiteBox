import type { XiaobaiOsAppActivationContext, XiaobaiOsAppRuntime } from '../../../types.js';
import { expeditionId, parseCommand } from './partition.js';
import { fault } from './random.js';
import type { ExpeditionService } from './service.js';

export function withExpeditionRuntime(primary: XiaobaiOsAppRuntime, service: ExpeditionService, identity: () => string): XiaobaiOsAppRuntime {
    let activation: { identity: string; post: XiaobaiOsAppActivationContext['post'] } | null = null, busy = false;
    let unsubscribe: (() => void) | undefined;
    const cancel = () => { activation = null; };
    function publish() { if (activation && !busy && identity() === activation.identity) { activation.post('game/expedition/state', { chatIdentity: activation.identity, state: service.view() }); } }
    return { ...primary,
        async activate(context) { const result = await primary.activate?.(context); activation = { identity: identity(), post: context.post }; return result; },
        async handleMessage(message) {
            if (!message.type.startsWith('game/expedition/')) { return primary.handleMessage?.(message); }
            const payload = message.payload as Record<string, unknown>, current = activation;
            if (!current || !payload || payload.chatIdentity !== current.identity || identity() !== current.identity) { fault('identity'); }
            if (busy) { fault('unavailable'); }
            busy = true; const guard = () => identity() === current.identity;
            try {
                if (message.type === 'game/expedition/read') { return await service.refresh(); }
                if (message.type === 'game/expedition/confirm') { return await service.confirm(guard); }
                if (message.type !== 'game/expedition/act') { fault('invalid'); }
                return await service.act({ actionId: expeditionId(payload.actionId), revision: payload.revision as number, command: parseCommand(payload.command) }, guard);
            } finally { busy = false; publish(); }
        },
        async deactivate(reason) { cancel(); await primary.deactivate?.(reason); },
        async cancelForeground(reason) { cancel(); await primary.cancelForeground?.(reason); },
        async cancelAll(reason) { cancel(); await primary.cancelAll?.(reason); },
        async handleChatChanged() { cancel(); await primary.handleChatChanged?.(); },
        async startBackground() { await primary.startBackground?.(); unsubscribe ??= service.subscribe(publish); },
        async stopBackground() { cancel(); unsubscribe?.(); unsubscribe = undefined; await primary.stopBackground?.(); },
    };
}
