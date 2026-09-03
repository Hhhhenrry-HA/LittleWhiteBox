import type { ScopedChatStore } from '../../../kernel/contracts.js';
import { jsonValuesEqual } from '../../../host/json-values-equal.js';
import { createDefaultFourthWallChatState } from '../domain/defaults.js';
import { parseFourthWallChatState } from '../domain/state.js';
import type { FourthWallChatState, FourthWallPartitionV1 } from '../types.js';

export interface FourthWallMutationOptions {
    beforeCommit?: () => void | Promise<void>;
}

export interface FourthWallChatRepository {
    prepareCurrentChatFourthWall(): Promise<FourthWallChatState>;
    readCurrentChatFourthWall(): FourthWallChatState | null;
    mutateCurrentChatFourthWall(
        action: (current: FourthWallChatState) => FourthWallChatState,
        options?: FourthWallMutationOptions,
    ): Promise<FourthWallChatState>;
}

function transactionError(result: {
    status: string;
    error?: { code: string; message: string; retryable: boolean };
    preparedResult?: FourthWallChatState;
}): Error {
    return Object.assign(new Error(result.error?.message || `fourth_wall_${result.status}`), {
        code: result.error?.code || (result.status === 'unconfirmed' ? 'storage_unconfirmed' : 'storage_conflict'),
        retryable: result.error?.retryable ?? true,
        uncertain: result.status === 'unconfirmed',
        preparedState: result.preparedResult ? structuredClone(result.preparedResult) : undefined,
    });
}

export function createFourthWallRepository(
    store: ScopedChatStore<FourthWallPartitionV1>,
    { now = Date.now }: { now?: () => number } = {},
): FourthWallChatRepository {
    async function prepareCurrentChatFourthWall(): Promise<FourthWallChatState> {
        const snapshot = await store.read();
        return structuredClone(snapshot.value?.state ?? createDefaultFourthWallChatState(now()));
    }

    async function mutateCurrentChatFourthWall(
        action: (current: FourthWallChatState) => FourthWallChatState,
        options: FourthWallMutationOptions = {},
    ): Promise<FourthWallChatState> {
        if (typeof action !== 'function') { throw new TypeError('chat mutation action must be a function'); }
        const result = await store.transact(transaction => {
            const current = transaction.current?.state ?? createDefaultFourthWallChatState(now());
            const next = parseFourthWallChatState(action(structuredClone(current)));
            if (!jsonValuesEqual(current, next)) {
                transaction.replace({ schemaVersion: 1, state: next });
            }
            return next;
        }, {
            commitGuard: options.beforeCommit
                ? async () => { await options.beforeCommit?.(); return true; }
                : undefined,
        });
        if (result.status === 'failed' || result.status === 'unconfirmed' || result.status === 'conflict') {
            throw transactionError(result);
        }
        const current = result.status === 'confirmed' ? result.snapshot.value?.state ?? null : result.result;
        if (!current) { throw new Error('fourth_wall_state_missing_after_commit'); }
        return structuredClone(current);
    }

    return Object.freeze({
        prepareCurrentChatFourthWall,
        readCurrentChatFourthWall: () => {
            const current = store.peekCurrent()?.value?.state;
            return current ? structuredClone(current) : null;
        },
        mutateCurrentChatFourthWall,
    });
}
