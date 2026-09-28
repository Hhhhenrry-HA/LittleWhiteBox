import type { StackingRequest } from './service.js';
import { parseCommand, stackingId } from './partition.js';
import { fault } from './domain.js';
export interface PendingIntent { runId: string; request: StackingRequest }
export interface RecoveryJournal { read(): PendingIntent | null; write(intent: PendingIntent): void; clear(): void }
const KEY = 'LittleWhiteBox:stacking:pending';
/** One unresolved intent, not another save-game. Survives a full Host restart; matched by unique paid run ID. */
export function createRecoveryJournal(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>): RecoveryJournal {
    return {
        read() {
            try {
                const raw = storage.getItem(KEY); if (raw === null) { return null; }
                const value = JSON.parse(raw) as PendingIntent;
                const runId = stackingId(value.runId), actionId = stackingId(value.request.actionId);
                const revision = value.request.revision, command = parseCommand(value.request.command);
                if (!Number.isSafeInteger(revision) || revision < 0 || command.type === 'start') { fault('recovery'); }
                return { runId, request: { actionId, revision, command } };
            } catch { return fault('recovery'); }
        },
        write(intent) { try { storage.setItem(KEY, JSON.stringify(intent)); } catch { fault('recovery'); } },
        clear() { try { storage.removeItem(KEY); } catch { fault('recovery'); } },
    };
}
