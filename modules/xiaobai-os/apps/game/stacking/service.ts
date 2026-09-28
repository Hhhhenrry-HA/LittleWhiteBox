import { ECONOMY_TRANSACTION_CAPABILITY, type EconomyReadCapability } from '../../../capabilities/economy/index.js';
import type { PartitionStore, XiaobaiOsFileControls, XiaobaiOsFileState } from '../../../kernel/contracts.js';
import { advance, bestRun, emptyStacking, fault, payout, replay, type Command, type StackingData } from './domain.js';
import { generate } from './rules.js';
import { STACKING_PARTITION, stackingId, newStackingId, parseCommand } from './partition.js';
import { postDifference, validateEconomy } from './economy.js';
import { STACKING_POLICY as P } from './policy.js';
import { DEFAULT_STACKING_SOUND_ENABLED } from '../settings.js';
export interface StackingView {
    revision: number; active: StackingData['active']; best: StackingData['best']; board: ReturnType<typeof replay> | null;
    balance: number; award: number; writeState: XiaobaiOsFileState; pending: boolean; ready: boolean; soundEnabled: boolean;
}
export interface StackingRequest { actionId: string; revision: number; command: Command }
export function createStackingService(store: PartitionStore<StackingData>, files: XiaobaiOsFileControls, economy: EconomyReadCapability,
    dependencies: { generate?: typeof generate; seed?: () => number; id?: () => string; idle?: () => boolean; soundEnabled?: () => boolean } = {}) {
    function view(): StackingView {
        const data = store.peekCurrent()?.value ?? emptyStacking(), receipt = data.receipts.find(r => r.runId === data.active?.id);
        return { revision: data.revision, active: data.active, best: bestRun(data), board: data.active ? replay(data.active) : null,
            balance: economy.getPlayerBalance(), award: receipt ? payout(receipt) : 0,
            writeState: files.getFileState(), pending: files.hasPendingCommit(STACKING_PARTITION.key), ready: economy.isOpen(),
            soundEnabled: dependencies.soundEnabled?.() ?? DEFAULT_STACKING_SOUND_ENABLED };
    }
    async function refresh() { await economy.refresh(); await store.read(); return view(); }
    async function act(input: StackingRequest, guard: () => boolean): Promise<StackingView> {
        stackingId(input.actionId); const command = parseCommand(input.command);
        if (!Number.isSafeInteger(input.revision) || input.revision < 0) { fault('invalid'); }
        const allowed = () => guard() && (dependencies.idle?.() ?? true);
        if (!allowed()) { fault('unavailable'); }
        const current = store.peekCurrent()?.value ?? emptyStacking(), repeated = current.last?.id === input.actionId;
        if (!repeated && input.revision !== current.revision) { fault('stale'); }
        let prepared: { id: string; seed: number } | undefined;
        if (!repeated && command.type === 'start') {
            if (view().balance < P.fee) { fault('funds'); }
            prepared = { id: stackingId((dependencies.id ?? newStackingId)()),
                seed: await (dependencies.generate ?? generate)((dependencies.seed ?? (() => crypto.getRandomValues(new Uint32Array(1))[0]))()) };
            if (!allowed()) { fault('unavailable'); }
        }
        let accepted = false;
        const result = await store.transact(transaction => {
            if (!allowed()) { fault('unavailable'); }
            const data = transaction.current ?? emptyStacking(), money = transaction.useCapability(ECONOMY_TRANSACTION_CAPABILITY);
            validateEconomy(data, money);
            if (data.last?.id === input.actionId) {
                if (JSON.stringify(data.last.command) !== JSON.stringify(command)) { fault('identity'); }
                return;
            }
            if (data.revision !== input.revision) { fault('stale'); }
            if (command.type === 'start' && money.getPlayerBalance() < P.fee) { fault('funds'); }
            const next = advance(data, command, input.actionId, prepared);
            postDifference(data, next, money); validateEconomy(next, money); transaction.replace(next); accepted = true;
        }, { retainFailedCandidate: true, commitGuard: () => (accepted || guard()) && (dependencies.idle?.() ?? true) });
        if (result.status !== 'confirmed' && result.status !== 'unchanged') { fault(`save_${result.status}`); }
        return view();
    }
    return { view, refresh, act,
        async confirm(guard: () => boolean) {
            if (files.hasPendingCommit() && !files.hasPendingCommit(STACKING_PARTITION.key)) { fault('unavailable'); }
            const result = await files.retryPending({ beforeRetry: guard });
            if (!guard()) { fault('unavailable'); }
            if (['confirmed', 'none', 'adopted'].includes(result.status)) { await refresh(); }
            return view();
        },
        subscribe(listener: () => void) {
            const stops = [store.subscribe(listener), economy.subscribe(listener), files.subscribeFileState(listener)];
            return () => stops.forEach(stop => stop());
        },
    };
}
export type StackingService = ReturnType<typeof createStackingService>;
