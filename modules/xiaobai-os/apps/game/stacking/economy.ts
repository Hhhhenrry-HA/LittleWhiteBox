import type { EconomyActionLeg, EconomyTransactionCapability } from '../../../capabilities/economy/index.js';
import { STACKING_POLICY as P } from './policy.js';
import { fault, payout, type Receipt, type StackingData } from './domain.js';
const PREFIX = 'stacking:', RESERVE = 'counterparty:game:stacking';
const COPY = { fee: '云上叠叠屋 · 开工', prize: '云上叠叠屋 · 收工' };
export function legs(receipt: Receipt): EconomyActionLeg[] {
    function leg(kind: keyof typeof COPY, actionId: string, amount: number): EconomyActionLeg {
        return { idempotencyKey: `${PREFIX}${receipt.runId}:${kind}`, actionId, sourceId: receipt.runId,
            fromAccountId: kind === 'fee' ? 'player' : RESERVE, toAccountId: kind === 'fee' ? RESERVE : 'player',
            amount, kind: `stacking_${kind}`, title: COPY[kind] };
    }
    const result = [leg('fee', receipt.admission, P.fee)], prize = payout(receipt);
    if (prize) { result.push(leg('prize', receipt.settlement!.actionId, prize)); }
    return result;
}
export function validateEconomy(data: StackingData, economy: EconomyTransactionCapability) {
    const expected = data.receipts.flatMap(legs), actual = economy.listOwnedTransactions().filter(t => t.idempotencyKey.startsWith(PREFIX));
    if (actual.length !== expected.length) { fault('invalid'); }
    for (const leg of expected) {
        const match = actual.find(t => t.idempotencyKey === leg.idempotencyKey);
        if (!match || match.actionId !== leg.actionId || match.sourceId !== leg.sourceId || match.amount !== leg.amount
            || match.kind !== leg.kind || match.fromAccountId !== leg.fromAccountId || match.toAccountId !== leg.toAccountId
            || match.reversalOfTransactionId) { fault('invalid'); }
    }
}
export function postDifference(before: StackingData, after: StackingData, economy: EconomyTransactionCapability) {
    const existing = new Set(before.receipts.flatMap(legs).map(leg => leg.idempotencyKey));
    const added = after.receipts.flatMap(legs).filter(leg => !existing.has(leg.idempotencyKey));
    if (added.length) { economy.postAction({ legs: added }); }
}
