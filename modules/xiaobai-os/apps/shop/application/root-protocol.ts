import type { StoryFingerprint } from '../../../host/story-fingerprint.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { validateLedger } from '../../../domains/economy/invariants.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import { reconcileLedgerWithStory } from '../../../domains/economy/timeline.js';
import type { EconomyLedgerV1 } from '../../../domains/economy/types.js';
import { getShopItem } from '../../../domains/shop/catalog.js';
import { validateShopDomain } from '../../../domains/shop/invariants.js';
import { reconcileShopWithStory } from '../../../domains/shop/timeline.js';
import type { ShopDomainV1, ShopRollbackImpact } from '../../../domains/shop/types.js';

export function emptyShopRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readEconomyLedger(root: XiaobaiOsChatData | null): EconomyLedgerV1 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function readShopDomain(root: XiaobaiOsChatData | null): ShopDomainV1 | null {
    const value = root?.domains.shop;
    if (value === undefined) {return null;}
    validateShopDomain(value);
    return structuredClone(value);
}

function sameAnchor(
    left: { floor: number; prefixHash: string },
    right: { floor: number; prefixHash: string },
): boolean {
    return left.floor === right.floor && left.prefixHash === right.prefixHash;
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
        const item = getShopItem(event.action.itemId);
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
            || !sameAnchor(matches[0].anchor, event.anchor)
        ) {
            throw new Error(`${path} Shop purchase action is inconsistent: ${event.actionId}`);
        }
    }
}

export function reconcileShopDomainInRoot(
    value: XiaobaiOsChatData,
    fingerprint: StoryFingerprint,
): { root: XiaobaiOsChatData; impact: ShopRollbackImpact } {
    const root = structuredClone(value);
    const shop = readShopDomain(root);
    if (!shop) {
        return {
            root,
            impact: {
                changed: false,
                firstInvalidRevision: null,
                removedEventIds: [],
                removedActionIds: [],
            },
        };
    }
    const reconciled = reconcileShopWithStory(shop, fingerprint);
    if (reconciled.impact.changed) {
        if (reconciled.domain.events.length === 0) {
            delete root.domains.shop;
        } else {
            root.domains.shop = reconciled.domain;
        }
    }
    return { root, impact: reconciled.impact };
}

export function reconcileShopRootWithStory(
    value: XiaobaiOsChatData,
    fingerprint: StoryFingerprint,
): XiaobaiOsChatData {
    let root = structuredClone(value);
    const ledger = readEconomyLedger(root);
    if (ledger) {root.domains.economy = reconcileLedgerWithStory(ledger, fingerprint).ledger;}
    root = reconcileShopDomainInRoot(root, fingerprint).root;
    validateShopEconomyConsistency(root);
    return root;
}

export function readPlayerBalance(root: XiaobaiOsChatData | null): number {
    const ledger = readEconomyLedger(root);
    return ledger ? projectBalances(ledger).player || 0 : 0;
}
