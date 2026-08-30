import type { StoryFingerprint } from '../../host/story-fingerprint.js';
import type { StoryActionRunner } from '../../host/story-action-runner.js';
import type { XiaobaiOsChatData, XiaobaiOsStoryAnchor } from '../../types.js';
import type {
    ConfirmResult,
    RootMutationOptions,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../host/chat-data-store.js';
import { ensureEconomy, listTransactions, postAction, projectBalances, reverseTransaction } from './ledger.js';
import { validateLedger } from './invariants.js';
import { reconcileLedgerWithStory } from './timeline.js';
import type {
    EconomyLedgerV1,
    EconomyPostActionResult,
    EconomyPostResult,
    EconomyRollbackImpact,
    EconomyTransactionPage,
    PostTransactionInput,
    ReverseTransactionInput,
} from './types.js';

export interface EconomyRepository {
    hasCurrent: () => boolean;
    readCurrent: () => EconomyLedgerV1 | null;
    ensureCurrent: () => Promise<EconomyLedgerV1>;
    getPlayerBalance: () => number;
    listCurrentTransactions: (options?: { beforeSequence?: number; limit?: number }) => EconomyTransactionPage;
    reconcileCurrent: (
        fingerprint: StoryFingerprint,
        options?: RootMutationOptions,
    ) => Promise<EconomyRollbackImpact>;
    postCurrent: (
        input: Omit<PostTransactionInput, 'anchor'>,
        options?: RootMutationOptions,
    ) => Promise<EconomyPostResult>;
    postActionCurrent: (
        inputs: readonly Omit<PostTransactionInput, 'anchor'>[],
        options?: RootMutationOptions,
    ) => Promise<EconomyPostActionResult>;
    reverseCurrent: (
        input: Omit<ReverseTransactionInput, 'anchor'>,
        options?: RootMutationOptions,
    ) => Promise<EconomyPostResult>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface EconomyRepositoryDependencies {
    now?: () => number;
    createId?: () => string;
    actionRunner?: StoryActionRunner;
}

function emptyRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

function readLedger(root: XiaobaiOsChatData | null): EconomyLedgerV1 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function createEconomyRepository(
    store: XiaobaiOsChatDataStore,
    { now = Date.now, createId, actionRunner }: EconomyRepositoryDependencies = {},
): EconomyRepository {
    const ledgerDependencies = { now, ...(createId ? { createId } : {}) };

    function readCurrent(): EconomyLedgerV1 | null {
        return readLedger(store.readCurrent());
    }

    function ensureCurrent(): Promise<EconomyLedgerV1> {
        return store.mutateCurrent((current) => {
            const existing = readLedger(current);
            if (existing) {return { next: current, result: existing };}
            const next = current ? structuredClone(current) : emptyRoot();
            const ledger = ensureEconomy(undefined, ledgerDependencies);
            next.domains.economy = structuredClone(ledger);
            return { next, result: structuredClone(ledger) };
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

    function reconcileCurrent(
        fingerprint: StoryFingerprint,
        options: RootMutationOptions = {},
    ): Promise<EconomyRollbackImpact> {
        return store.mutateCurrent((current, context) => {
            if (context.identityKey !== fingerprint.identityKey) {
                throw new Error('story_fingerprint_chat_mismatch');
            }
            const ledger = readLedger(current);
            if (!current || !ledger) {
                return {
                    next: current,
                    result: {
                        changed: false,
                        firstInvalidSequence: null,
                        removedTransactionIds: [],
                        removedActionIds: [],
                        previousBalance: 0,
                        nextBalance: 0,
                    },
                };
            }
            const reconciled = reconcileLedgerWithStory(ledger, fingerprint);
            if (!reconciled.impact.changed) {return { next: current, result: reconciled.impact };}
            const next = structuredClone(current);
            next.domains.economy = reconciled.ledger;
            return { next, result: reconciled.impact };
        }, options);
    }

    function requireActionRunner(): StoryActionRunner {
        if (!actionRunner) {
            throw new Error('economy_story_access_unavailable');
        }
        return actionRunner;
    }

    function actionAnchor(
        ledger: EconomyLedgerV1,
        inputs: readonly Omit<PostTransactionInput, 'anchor'>[],
        fallback: XiaobaiOsStoryAnchor,
    ): XiaobaiOsStoryAnchor {
        const actionId = inputs[0]?.actionId;
        const existing = actionId
            ? ledger.transactions.find((transaction) => transaction.actionId === actionId)
            : undefined;
        return structuredClone(existing?.anchor || fallback);
    }

    async function postActionCurrent(
        inputs: readonly Omit<PostTransactionInput, 'anchor'>[],
        options: RootMutationOptions = {},
    ): Promise<EconomyPostActionResult> {
        return requireActionRunner().run((current, _rootContext, storyContext) => {
            const next = current ? structuredClone(current) : emptyRoot();
            const existing = ensureEconomy(readLedger(current) || undefined, ledgerDependencies);
            const reconciled = reconcileLedgerWithStory(existing, storyContext.fingerprint).ledger;
            const anchor = actionAnchor(reconciled, inputs, storyContext.anchor);
            const result = postAction(
                reconciled,
                inputs.map((input) => ({ ...input, anchor })),
                ledgerDependencies,
            );
            next.domains.economy = result.ledger;
            return { next, result };
        }, options);
    }

    async function postCurrent(
        input: Omit<PostTransactionInput, 'anchor'>,
        options: RootMutationOptions = {},
    ): Promise<EconomyPostResult> {
        const result = await postActionCurrent([input], options);
        return {
            ledger: result.ledger,
            transaction: result.transactions[0],
            created: result.created,
        };
    }

    async function reverseCurrent(
        input: Omit<ReverseTransactionInput, 'anchor'>,
        options: RootMutationOptions = {},
    ): Promise<EconomyPostResult> {
        return requireActionRunner().run((current, _rootContext, storyContext) => {
            const ledger = readLedger(current);
            if (!current || !ledger) {throw new Error('economy_not_opened');}
            const reconciled = reconcileLedgerWithStory(ledger, storyContext.fingerprint).ledger;
            const existing = reconciled.transactions.find(
                (transaction) => transaction.idempotencyKey === input.idempotencyKey,
            );
            const result = reverseTransaction(reconciled, {
                ...input,
                anchor: structuredClone(existing?.anchor || storyContext.anchor),
            }, ledgerDependencies);
            const next = structuredClone(current);
            next.domains.economy = result.ledger;
            return { next, result };
        }, options);
    }

    return Object.freeze({
        hasCurrent: () => readCurrent() !== null,
        readCurrent,
        ensureCurrent,
        getPlayerBalance,
        listCurrentTransactions,
        reconcileCurrent,
        postCurrent,
        postActionCurrent,
        reverseCurrent,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
