import { ECONOMY_TRANSACTION_CAPABILITY, type EconomyReadCapability } from '../../../capabilities/economy/index.js';
import type { PartitionStore, XiaobaiOsFileControls, XiaobaiOsFileState } from '../../../kernel/contracts.js';
import { advanceExpedition, emptyExpedition, expeditionProgress } from './domain.js';
import { postAwards, validateEconomy } from './economy.js';
import { EXPEDITION_PARTITION, expeditionId, parseCommand } from './partition.js';
import { fault } from './random.js';
import type { Command, ExpeditionData } from './types.js';

export interface ExpeditionView { data: ExpeditionData & ReturnType<typeof expeditionProgress>; balance: number; ready: boolean; pending: boolean; writeState: XiaobaiOsFileState }
export interface ExpeditionRequest { actionId: string; revision: number; command: Command }
export function createExpeditionService(store: PartitionStore<ExpeditionData>, files: XiaobaiOsFileControls, economy: EconomyReadCapability,
    dependencies: { seed?: () => number; idle?: () => boolean } = {}) {
    function view(): ExpeditionView {
        const data = structuredClone(store.peekCurrent()?.value ?? emptyExpedition());
        return { data: { ...data, ...expeditionProgress(data) }, balance: economy.getPlayerBalance(), ready: economy.isOpen(),
            pending: files.hasPendingCommit(EXPEDITION_PARTITION.key), writeState: files.getFileState() };
    }
    async function refresh() { await economy.refresh(); await store.read(); return view(); }
    async function act(input: ExpeditionRequest, guard: () => boolean): Promise<ExpeditionView> {
        expeditionId(input.actionId); const command = parseCommand(input.command);
        if (!Number.isSafeInteger(input.revision) || input.revision < 0) { fault('invalid'); }
        const allowed = () => guard() && (dependencies.idle?.() ?? true);
        if (!allowed()) { fault('unavailable'); }
        let accepted = false;
        const result = await store.transact(transaction => {
            if (!allowed()) { fault('unavailable'); }
            const data = transaction.current ?? emptyExpedition(), money = transaction.useCapability(ECONOMY_TRANSACTION_CAPABILITY);
            validateEconomy(data, money);
            if (data.last?.id === input.actionId) { if (JSON.stringify(data.last.command) !== JSON.stringify(command)) { fault('identity'); } return; }
            if (data.revision !== input.revision) { fault('stale'); }
            const seed = command.type === 'start' ? (dependencies.seed?.() ?? crypto.getRandomValues(new Uint32Array(1))[0]) : 0;
            const next = advanceExpedition(data, command, input.actionId, seed);
            postAwards(data, next, money); validateEconomy(next, money); transaction.replace(next); accepted = true;
        }, { retainFailedCandidate: true, commitGuard: () => (accepted || guard()) && (dependencies.idle?.() ?? true) });
        if (result.status !== 'confirmed' && result.status !== 'unchanged') { throw Object.assign(new Error(`expedition_save_${result.status}`), { code: `expedition_save_${result.status}` }); }
        return view();
    }
    return { view, refresh, act,
        async confirm(guard: () => boolean) {
            if (files.hasPendingCommit() && !files.hasPendingCommit(EXPEDITION_PARTITION.key)) { fault('unavailable'); }
            if (!guard() || !(dependencies.idle?.() ?? true)) { fault('unavailable'); }
            await files.retryPending({ beforeRetry: guard }); await refresh(); return view();
        },
        subscribe(listener: () => void) { const stops = [store.subscribe(listener), economy.subscribe(listener), files.subscribeFileState(listener)]; return () => stops.forEach(stop => stop()); },
    };
}
export type ExpeditionService = ReturnType<typeof createExpeditionService>;
