import type { XiaobaiOsChatData } from '../../types.js';
import type {
    ConfirmResult,
    RootMutationOptions,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../host/chat-data-store.js';
import { ensureEconomy, listTransactions, postAction, projectBalances, reverseTransaction } from './ledger.js';
import { upgradeEconomyLedger } from './migration.js';
import { validateLedger } from './invariants.js';
import type {
    EconomyLedgerV2,
    EconomyPostActionResult,
    EconomyPostResult,
    EconomyTransactionPage,
    PostTransactionInput,
    ReverseTransactionInput,
} from './types.js';

export interface EconomyRepository {
    hasCurrent: () => boolean;
    readCurrent: () => EconomyLedgerV2 | null;
    ensureCurrent: () => Promise<EconomyLedgerV2>;
    prepareCurrent: () => Promise<void>;
    getPlayerBalance: () => number;
    listCurrentTransactions: (options?: { beforeSequence?: number; limit?: number }) => EconomyTransactionPage;
    postCurrent: (
        input: PostTransactionInput,
        options?: RootMutationOptions,
    ) => Promise<EconomyPostResult>;
    postActionCurrent: (
        inputs: readonly PostTransactionInput[],
        options?: RootMutationOptions,
    ) => Promise<EconomyPostActionResult>;
    reverseCurrent: (
        input: ReverseTransactionInput,
        options?: RootMutationOptions,
    ) => Promise<EconomyPostResult>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface EconomyRepositoryDependencies {
    now?: () => number;
    createId?: () => string;
}

function emptyRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

function readLedger(root: XiaobaiOsChatData | null): EconomyLedgerV2 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    const ledger = upgradeEconomyLedger(value) ?? value;
    validateLedger(ledger);
    return structuredClone(ledger);
}

export function createEconomyRepository(
    store: XiaobaiOsChatDataStore,
    { now = Date.now, createId }: EconomyRepositoryDependencies = {},
): EconomyRepository {
    const ledgerDependencies = { now, ...(createId ? { createId } : {}) };

    function readCurrent(): EconomyLedgerV2 | null {
        return readLedger(store.readCurrent());
    }

    function ensureCurrent(): Promise<EconomyLedgerV2> {
        return store.mutateCurrent((current) => {
            if (current) {
                const value = current.domains.economy;
                if (value !== undefined) {
                    const upgraded = upgradeEconomyLedger(value);
                    const ledger = upgraded ?? value;
                    validateLedger(ledger);
                    if (!upgraded) {return { next: current, result: structuredClone(ledger) };}
                    const next = structuredClone(current);
                    next.domains.economy = upgraded;
                    return { next, result: structuredClone(upgraded) };
                }
            }
            const next = current ? structuredClone(current) : emptyRoot();
            const ledger = ensureEconomy(undefined, ledgerDependencies);
            next.domains.economy = structuredClone(ledger);
            return { next, result: structuredClone(ledger) };
        });
    }

    function prepareCurrent(): Promise<void> {
        return store.mutateCurrent((current) => {
            if (!current) {return { next: current, result: undefined };}
            const value = current.domains.economy;
            if (value === undefined) {return { next: current, result: undefined };}
            const upgraded = upgradeEconomyLedger(value);
            if (!upgraded) {
                validateLedger(value);
                return { next: current, result: undefined };
            }
            const next = structuredClone(current);
            next.domains.economy = upgraded;
            return { next, result: undefined };
        });
    }

    function getPlayerBalance(): number {
        const ledger = readCurrent();
        return ledger ? projectBalances(ledger).player || 0 : 0;
    }

    function listCurrentTransactions(options: { beforeSequence?: number; limit?: number } = {}): EconomyTransactionPage {
        const ledger = readCurrent();
        if (!ledger) {return { transactions: [], nextCursor: null, hasMore: false };}
        return listTransactions(ledger, options);
    }

    function postActionCurrent(
        inputs: readonly PostTransactionInput[],
        options: RootMutationOptions = {},
    ): Promise<EconomyPostActionResult> {
        return store.mutateCurrent((current) => {
            const next = current ? structuredClone(current) : emptyRoot();
            const ledger = ensureEconomy(readLedger(current) || undefined, ledgerDependencies);
            const result = postAction(ledger, inputs, ledgerDependencies);
            next.domains.economy = result.ledger;
            return { next, result };
        }, options);
    }

    async function postCurrent(
        input: PostTransactionInput,
        options: RootMutationOptions = {},
    ): Promise<EconomyPostResult> {
        const result = await postActionCurrent([input], options);
        return {
            ledger: result.ledger,
            transaction: result.transactions[0],
            created: result.created,
        };
    }

    function reverseCurrent(
        input: ReverseTransactionInput,
        options: RootMutationOptions = {},
    ): Promise<EconomyPostResult> {
        return store.mutateCurrent((current) => {
            const ledger = readLedger(current);
            if (!current || !ledger) {throw new Error('economy_not_opened');}
            const result = reverseTransaction(ledger, input, ledgerDependencies);
            const next = structuredClone(current);
            next.domains.economy = result.ledger;
            return { next, result };
        }, options);
    }

    return Object.freeze({
        hasCurrent: () => readCurrent() !== null,
        readCurrent,
        ensureCurrent,
        prepareCurrent,
        getPlayerBalance,
        listCurrentTransactions,
        postCurrent,
        postActionCurrent,
        reverseCurrent,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
