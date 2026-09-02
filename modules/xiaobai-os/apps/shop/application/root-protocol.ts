import type { XiaobaiOsChatData } from '../../../types.js';
import { validateLedger } from '../../../domains/economy/invariants.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV2 } from '../../../domains/economy/types.js';
import { getShopContract } from '../../../domains/shop/catalog.js';
import { validateShopDomain } from '../../../domains/shop/invariants.js';
import type { ShopDomainV2 } from '../../../domains/shop/types.js';

export function emptyShopRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readEconomyLedger(root: XiaobaiOsChatData | null): EconomyLedgerV2 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function readShopDomain(root: XiaobaiOsChatData | null): ShopDomainV2 | null {
    const value = root?.domains.shop;
    if (value === undefined) {return null;}
    validateShopDomain(value);
    return structuredClone(value);
}

export function validateShopEconomyConsistency(value: unknown, path = 'xiaobaiOs'): void {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${path} must be an object`);
    }
    const root = value as XiaobaiOsChatData;
    const shop = readShopDomain(root);
    const ledger = readEconomyLedger(root);
    const purchaseEvents = shop?.events.filter((event) => event.action.kind === 'purchase') || [];
    const purchaseTransactions = ledger?.transactions.filter((transaction) => (
        transaction.sourceDomain === 'shop' || transaction.kind === 'shop_purchase'
    )) || [];
    if (purchaseEvents.length !== purchaseTransactions.length) {
        throw new Error(`${path} Shop purchase events and Economy transactions are inconsistent`);
    }
    for (const event of purchaseEvents) {
        if (event.action.kind !== 'purchase') {continue;}
        const item = getShopContract(event.action.itemId);
        const matches = purchaseTransactions.filter((transaction) => transaction.actionId === event.actionId);
        if (
            matches.length !== 1
            || matches[0].idempotencyKey !== `shop:purchase:${event.actionId}`
            || matches[0].fromAccountId !== 'player'
            || matches[0].toAccountId !== 'system:sink'
            || matches[0].amount !== item.price
            || matches[0].kind !== 'shop_purchase'
            || matches[0].sourceDomain !== 'shop'
            || matches[0].sourceId !== item.id
        ) {
            throw new Error(`${path} Shop purchase action is inconsistent: ${event.actionId}`);
        }
    }
}

export function readPlayerBalance(root: XiaobaiOsChatData | null): number {
    const ledger = readEconomyLedger(root);
    return ledger ? projectBalances(ledger).player || 0 : 0;
}
