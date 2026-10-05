import type { EconomyActionLeg, EconomyTransactionCapability } from '../../../capabilities/economy/index.js';
import { COPY } from './copy.js';
import { fault } from './random.js';
import type { ExpeditionData } from './types.js';

function legs(data: ExpeditionData): EconomyActionLeg[] {
    return data.awards.map(a => ({ idempotencyKey: `expedition:${a.key}`, actionId: a.actionId, sourceId: a.runId,
        fromAccountId: 'counterparty:game:expedition', toAccountId: 'player', amount: a.amount, kind: 'expedition_award', title: COPY.name }));
}
export function validateEconomy(data: ExpeditionData, economy: EconomyTransactionCapability) {
    const expected = legs(data), actual = economy.listOwnedTransactions().filter(t => t.idempotencyKey.startsWith('expedition:'));
    if (expected.length !== actual.length) { fault('invalid'); }
    for (const leg of expected) {
        const match = actual.find(t => t.idempotencyKey === leg.idempotencyKey);
        if (!match || match.actionId !== leg.actionId || match.sourceId !== leg.sourceId || match.amount !== leg.amount || match.kind !== leg.kind
            || match.fromAccountId !== leg.fromAccountId || match.toAccountId !== leg.toAccountId || match.reversalOfTransactionId) { fault('invalid'); }
    }
}
export function postAwards(before: ExpeditionData, after: ExpeditionData, economy: EconomyTransactionCapability) {
    const known = new Set(before.awards.map(a => a.key)); const fresh = legs(after).filter(l => !known.has(l.idempotencyKey.slice('expedition:'.length)));
    if (fresh.length) { economy.postAction({ legs: fresh }); }
}
