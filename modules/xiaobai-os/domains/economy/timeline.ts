import type { StoryFingerprint } from '../../host/story-fingerprint.js';
import { EMPTY_STORY_PREFIX_HASH } from '../../types.js';
import { projectBalances } from './ledger.js';
import { validateLedger } from './invariants.js';
import type { EconomyLedgerV1, EconomyRollbackImpact } from './types.js';

function isAnchorValid(
    transaction: EconomyLedgerV1['transactions'][number],
    fingerprint: StoryFingerprint,
): boolean {
    if (transaction.sequence === 1) {return true;}
    if (transaction.anchor.floor === -1) {
        return transaction.anchor.prefixHash === EMPTY_STORY_PREFIX_HASH;
    }
    return fingerprint.prefixHashes[transaction.anchor.floor] === transaction.anchor.prefixHash;
}

export function reconcileLedgerWithStory(
    ledger: EconomyLedgerV1,
    fingerprint: StoryFingerprint,
): { ledger: EconomyLedgerV1; impact: EconomyRollbackImpact } {
    validateLedger(ledger);
    let firstInvalidIndex = -1;
    for (let index = 1; index < ledger.transactions.length;) {
        const actionId = ledger.transactions[index].actionId;
        let end = index + 1;
        while (end < ledger.transactions.length && ledger.transactions[end].actionId === actionId) {end += 1;}
        if (!isAnchorValid(ledger.transactions[index], fingerprint)) {
            firstInvalidIndex = index;
            break;
        }
        index = end;
    }
    const previousBalance = projectBalances(ledger).player || 0;
    if (firstInvalidIndex < 0) {
        return {
            ledger: structuredClone(ledger),
            impact: {
                changed: false,
                firstInvalidSequence: null,
                removedTransactionIds: [],
                removedActionIds: [],
                previousBalance,
                nextBalance: previousBalance,
            },
        };
    }
    const removed = ledger.transactions.slice(firstInvalidIndex);
    const next: EconomyLedgerV1 = {
        ...structuredClone(ledger),
        transactions: structuredClone(ledger.transactions.slice(0, firstInvalidIndex)),
    };
    validateLedger(next);
    const nextBalance = projectBalances(next).player || 0;
    return {
        ledger: next,
        impact: {
            changed: true,
            firstInvalidSequence: removed[0]?.sequence ?? null,
            removedTransactionIds: removed.map((transaction) => transaction.id),
            removedActionIds: [...new Set(removed.map((transaction) => transaction.actionId))],
            previousBalance,
            nextBalance,
        },
    };
}
